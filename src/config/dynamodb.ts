import { ok } from 'assert';
import { Environment, ENV } from './environment';

interface DynamoDbConfig {
  uri: string;
  donationsTable: string;
}

const config: { [key in Environment]: DynamoDbConfig } = {
  [Environment.Development]: {
    uri: 'http://dynamodb:8000',
    donationsTable: 'donor-contact',
  },
  [Environment.Production]: {
    uri: process.env.DYNAMODB_URL as string,
    donationsTable: process.env.DYNAMODB_DONATIONS_TABLE || 'donor-contact',
  },
};

export const dynamoDb = config[ENV];

ok(dynamoDb.uri, 'DynamoDB uri DYNAMODB_URL is not configured');
