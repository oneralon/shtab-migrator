import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Cron } from '@nestjs/schedule';
import { GetDonationsQuery } from 'src/modules/dynamodb/queries';
import {
  CreateAnomalyCommand,
  CreateDonorCommand,
  CreateSyncCommand,
  UpdateDonorCommand,
} from 'src/modules/postgres';
import { FindDonorQuery, FindLastSyncQuery } from 'src/modules/postgres/queries';

@Injectable()
export class SyncInteractor {
  private readonly logger = new Logger(this.constructor.name);

  @Inject()
  private readonly commandBus: CommandBus;

  @Inject()
  private readonly queryBus: QueryBus;

  private readonly testRegExp = /test/im;

  private running = false;

  @Cron('* */30 * * *')
  public async execute() {
    if (this.running) {
      this.logger.verbose('Already running');

      return;
    }

    try {
      this.running = true;

      let last: Record<string, AttributeValue>;
      let added = 0;
      let updated = 0;
      let skipped = 0;
      let processed = 0;

      const lastSync = await this.queryBus.execute(new FindLastSyncQuery());

      do {
        const value = await this.queryBus.execute(new GetDonationsQuery(last, lastSync?.createdAt));

        await Promise.all(value.items.map(async ({ name, email }) => {
          if (this.testRegExp.test(name) || this.testRegExp.test(email)) {
            const message = `Skipping test record ${ name } (${ email })`;

            await this.commandBus.execute(new CreateAnomalyCommand(message));

            this.logger.debug(message);

            skipped++;

            return;
          }

          const exists = await this.queryBus.execute(new FindDonorQuery(email));

          console.log(exists);

          if (exists) {
            if (exists.name !== name) {
              await this.commandBus.execute(new UpdateDonorCommand(name, email));

              const message = `Existing donor (${ email }) updated ${ exists.name } -> ${ name }`;

              await this.commandBus.execute(new CreateAnomalyCommand(message));

              this.logger.debug(message);

              updated++;
            }
          } else {
            await this.commandBus.execute(new CreateDonorCommand(name, email));

            added++;
          }
        }));

        processed += value.items.length;

        last = value.last;
      } while (last);

      const message = [
        `Added ${ added }, updated ${ updated } donors`,
        `Skipped ${ skipped } test donation records`,
        `Processed ${ processed } DynamoDB records`
      ].join('. ');

      await this.commandBus.execute(new CreateSyncCommand(message));

      this.logger.log(message);
    } catch (e) {
      this.logger.error(e);
    } finally {
      this.running = false;
    }
  }
}
