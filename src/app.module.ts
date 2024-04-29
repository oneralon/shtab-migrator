import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { InteractorsModule } from './interactors/module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    InteractorsModule,
  ],
})
export class AppModule {}
