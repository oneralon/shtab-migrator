import { Command } from '@nestjs-architects/typed-cqrs';
import { Email, Name } from 'src/core';
import { Donor } from '../entities';

export class CreateDonorCommand extends Command<Donor> {
  constructor(
    public readonly name: Name,
    public readonly email: Email,
  ) {
    super();
  }
}
