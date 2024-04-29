import { Command } from '@nestjs-architects/typed-cqrs';
import { Sync } from '../entities';

export class CreateSyncCommand extends Command<Sync> {
  constructor(
    public readonly log: string,
  ) {
    super();
  }
}
