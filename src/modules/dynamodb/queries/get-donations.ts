import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { Query } from '@nestjs-architects/typed-cqrs';
import { Email, Name } from 'src/core';

interface Donation {
  name: Name;
  email: Email;
  createdAt: Date;
}

type Output = { items: Array<Donation>, last?: Record<string, AttributeValue> };

export class GetDonationsQuery extends Query<Output> {
  constructor(
    public readonly exclusiveStartKey?: Record<string, AttributeValue>,
  ) {
    super();
  }
}
