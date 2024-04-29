import { Query } from '@nestjs-architects/typed-cqrs';
import { Sync } from '../entities';

export class FindLastSyncQuery extends Query<Sync | null> {
  constructor() {
    super();
  }
}
