import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { IncomingMessage, ServerResponse } from 'http';
import { AppModule } from './app.module';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/ready', (_: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ ready: 'ok' }));
    res.end();
  });

  await app.listen(port);
  Logger.log(`Applications is listening at http://localhost:${ port }`);
}

bootstrap();
