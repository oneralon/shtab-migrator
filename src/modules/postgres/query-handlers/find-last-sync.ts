import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sync } from '../entities';
import { FindLastSyncQuery } from '../queries';

@QueryHandler(FindLastSyncQuery)
export class FindLastSyncQueryHandler implements IInferredQueryHandler<FindLastSyncQuery> {
  @InjectRepository(Sync)
  private readonly model: Repository<Sync>;

  public async execute() {
    return this.model.findOne({ where: {}, order: { id: 'DESC' } });
  }
}
