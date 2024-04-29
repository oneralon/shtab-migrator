import {
  CreateTableCommand,
  DynamoDBClient,
  ListTablesCommand,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { promises as fs } from 'fs';
import { dynamoDb } from 'src/config';

@Injectable()
export class HealthCheck implements OnModuleInit {
  private readonly logger = new Logger(this.constructor.name);

  @Inject()
  private readonly dynamoDb: DynamoDBClient;

  public async onModuleInit() {
    try {
      const tables = await this
        .dynamoDb
        .send(new ListTablesCommand({}))
        .then(({ TableNames }) => TableNames ?? []);

      if (process.env.LOAD_EXAMPLE_DATA === 'true') {
        if (!tables.includes(dynamoDb.donationsTable)) {
          await this.dynamoDb.send(new CreateTableCommand({
            TableName: dynamoDb.donationsTable,
            AttributeDefinitions: [{ AttributeName: 'uuid', AttributeType: 'S' }],
            KeySchema: [{ AttributeName: 'uuid', KeyType: 'HASH' }],
            ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 10 },
          }));
        }

        const data = await fs
          .readFile(`${ __dirname }/../../../dump.json`)
          .then(buffer => JSON.parse(buffer.toString()));

        for (const value of data) {
          const item = Object
            .entries(value)
            .map(([k, v]) => {
              switch (typeof v) {
                case 'string': return [k, { S: v }];
                case 'number': return [k, { N: v }];
                case 'boolean': return [k, { BOOL: v }];
                default: return [k, { S: v.toString() }];
              }
            })
            .reduce((val, [k, v]) => ({ ...val, [k as string]: v }), {});

          await this.dynamoDb.send(new PutItemCommand({ TableName: dynamoDb.donationsTable, Item: item }));
        }

        this.logger.warn('DynamoDB test data added');
      }
    } catch (e) {
      this.logger.error('DynamoDB health check failed');
    }
  }
}
