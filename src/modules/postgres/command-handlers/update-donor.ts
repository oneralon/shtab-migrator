import { IInferredCommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateDonorCommand } from '../commands';
import { Donor } from '../entities';

@CommandHandler(UpdateDonorCommand)
export class UpdateDonorCommandHandler implements IInferredCommandHandler<UpdateDonorCommand> {
  @InjectRepository(Donor)
  private readonly model: Repository<Donor>;

  public async execute({ email, name }: UpdateDonorCommand) {
    await this.model.update({ email }, { name });
  }
}
