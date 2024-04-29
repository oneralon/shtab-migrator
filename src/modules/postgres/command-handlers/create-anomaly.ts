import { IInferredCommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnomalyCommand } from '../commands';
import { Anomaly } from '../entities';

@CommandHandler(CreateAnomalyCommand)
export class CreateAnomalyCommandHandler implements IInferredCommandHandler<CreateAnomalyCommand> {
  @InjectRepository(Anomaly)
  private readonly model: Repository<Anomaly>;

  public async execute({ title }: CreateAnomalyCommand) {
    const model = this.model.create({ title });

    return this.model.save(model);
  }
}
