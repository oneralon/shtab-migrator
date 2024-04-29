import { ok } from 'assert';
import { Environment, ENV } from './environment';

interface AwsConfig {
  region: string;
  accessKeyId: string,
  secretAccessKey: string,
}

const config: { [key in Environment]: AwsConfig } = {
  [Environment.Development]: {
    region: 'eu-central-1',
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey',
  },
  [Environment.Production]: {
    region: process.env.AWS_REGION!,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

export const aws = config[ENV];

ok(aws.region, 'AWS region in AWS_REGION is not configured');
ok(aws.accessKeyId, 'AWS access key id in AWS_ACCESS_KEY_ID is not configured');
ok(aws.secretAccessKey, 'AWS secret access key in AWS_SECRET_ACCESS_KEY is not configured');
