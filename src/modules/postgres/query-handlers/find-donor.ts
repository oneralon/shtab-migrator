import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donor } from '../entities';
import { FindDonorQuery } from '../queries';

@QueryHandler(FindDonorQuery)
export class FindDonorQueryHandler implements IInferredQueryHandler<FindDonorQuery> {
  @InjectRepository(Donor)
  private readonly model: Repository<Donor>;

  public async execute({ email }: FindDonorQuery) {
    return this.model.findOneBy({ email });
  }
}
