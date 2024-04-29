import { ok } from 'assert';
import { Environment, ENV } from './environment';

interface PostgresConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

const config: { [key in Environment]: PostgresConfig } = {
  [Environment.Development]: {
    host: 'postgres',
    port: 5432,
    database: 'shtab',
    username: 'postgres',
    password: 'changeme',
  },
  [Environment.Production]: {
    host: process.env.POSTGRES_HOST as string,
    port: parseInt(process.env.POSTGRES_PORT ?? '0', 10),
    database: process.env.POSTGRES_DATABASE as string,
    username: process.env.POSTGRES_USERNAME as string,
    password: process.env.POSTGRES_PASSWORD as string,
  },
};

export const postgres = config[ENV];

ok(postgres.host, 'PostgreSQL host POSTGRES_HOST is not configured');
ok(postgres.port, 'PostgreSQL post POSTGRES_PORT is not configured');
ok(postgres.database, 'PostgreSQL database POSTGRES_DATABASE is not configured');
ok(postgres.username, 'PostgreSQL username POSTGRES_USERNAME is not configured');
ok(postgres.password, 'PostgreSQL password POSTGRES_PASSWORD is not configured');
