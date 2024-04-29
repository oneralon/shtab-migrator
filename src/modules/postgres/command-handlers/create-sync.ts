import { IInferredCommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSyncCommand } from '../commands';
import { Sync } from '../entities';

@CommandHandler(CreateSyncCommand)
export class CreateSyncCommandHandler implements IInferredCommandHandler<CreateSyncCommand> {
  @InjectRepository(Sync)
  private readonly model: Repository<Sync>;

  public async execute({ log }: CreateSyncCommand) {
    const model = this.model.create({ log });

    return this.model.save(model);
  }
}
