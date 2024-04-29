import { IInferredCommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDonorCommand } from '../commands';
import { Donor } from '../entities';

@CommandHandler(CreateDonorCommand)
export class CreateDonorCommandHandler implements IInferredCommandHandler<CreateDonorCommand> {
  @InjectRepository(Donor)
  private readonly model: Repository<Donor>;

  public async execute({ email, name }: CreateDonorCommand) {
    const model = this.model.create({ name, email: email.toLowerCase() });

    return this.model.save(model);
  }
}
