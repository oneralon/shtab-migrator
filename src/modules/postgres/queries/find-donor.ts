import { Query } from '@nestjs-architects/typed-cqrs';
import { Email } from 'src/core';
import { Donor } from '../entities';

export class FindDonorQuery extends Query<Donor | null> {
  constructor(
    public readonly email: Email,
  ) {
    super();
  }
}
