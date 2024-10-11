import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configurar CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Permitir solo el frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Usar el ValidationPipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3001);
}

bootstrap();
