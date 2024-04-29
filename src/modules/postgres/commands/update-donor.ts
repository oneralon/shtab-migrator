import { Command } from '@nestjs-architects/typed-cqrs';
import { Email, Name } from 'src/core';

export class UpdateDonorCommand extends Command<void> {
  constructor(
    public readonly name: Name,
    public readonly email: Email,
  ) {
    super();
  }
}
