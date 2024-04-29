import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DynamoDbModule } from 'src/modules/dynamodb/module';
import { PostgresModule } from 'src/modules/postgres/module';
import * as Interactors from './interactors';

@Module({
  imports: [
    CqrsModule,
    DynamoDbModule,
    PostgresModule,
  ],
  providers: Object.values(Interactors),
})
export class InteractorsModule { }
