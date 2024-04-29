import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgres } from 'src/config';
import { Bootstrap } from './bootstrap';
import * as Commands from './command-handlers';
import * as Entities from './entities';
import * as Queries from './query-handlers';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: postgres.host,
      port: postgres.port,
      username: postgres.username,
      password: postgres.password,
      entities: Object.values(Entities),
      database: postgres.database,
      synchronize: false,
      logging: false,
    }),

    TypeOrmModule.forFeature(Object.values(Entities)),
  ],
  providers: [
    ...Object.values(Commands),
    ...Object.values(Queries),

    Bootstrap,
  ],
})
export class PostgresModule { }
