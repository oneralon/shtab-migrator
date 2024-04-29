import { Command } from '@nestjs-architects/typed-cqrs';
import { Anomaly } from '../entities';

export class CreateAnomalyCommand extends Command<Anomaly> {
  constructor(
    public readonly title: string,
  ) {
    super();
  }
}
