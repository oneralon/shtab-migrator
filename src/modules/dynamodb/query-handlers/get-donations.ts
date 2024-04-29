import { DynamoDBClient, ScanCommand, ScanCommandInput } from '@aws-sdk/client-dynamodb';
import { Inject } from '@nestjs/common';
import { IInferredQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Email, Name } from 'src/core';
import { dynamoDb } from 'src/config';
import { GetDonationsQuery } from '../queries';

@QueryHandler(GetDonationsQuery)
export class GetDonationsQueryHandler implements IInferredQueryHandler<GetDonationsQuery> {
  @Inject()
  private readonly dynamoDb: DynamoDBClient;

  public async execute({ exclusiveStartKey, since }: GetDonationsQuery) {
    const query: ScanCommandInput = {
      TableName: dynamoDb.donationsTable,
      Limit: 10,
      ExclusiveStartKey: exclusiveStartKey,
      FilterExpression: 'created_at > :since',
      ExpressionAttributeValues: { ':since': { S: (since ?? new Date(0)).toISOString() } },
    };

    const { Items, LastEvaluatedKey } = await this.dynamoDb.send(new ScanCommand(query));

    return {
      items: Items.map(item => ({
        name: Name.cast(item.name.S!),
        email: Email.cast(item.email.S!),
        createdAt: new Date(item.created_at.S),
      })),
      last: LastEvaluatedKey,
    };
  }
}
