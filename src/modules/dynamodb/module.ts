import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Module } from '@nestjs/common';
import { aws, dynamoDb } from 'src/config';
import { HealthCheck } from './health-check';
import * as Queries from './query-handlers';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
  ],
  providers: [
    {
      provide: DynamoDBClient,
      useValue: new DynamoDBClient({
        region: aws.region,
        endpoint: dynamoDb.uri,
        credentials: {
          accessKeyId: aws.accessKeyId,
          secretAccessKey: aws.secretAccessKey,
        },
      }),
    },

    ...Object.values(Queries),

    HealthCheck,
  ],
})
export class DynamoDbModule { }
