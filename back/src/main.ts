import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Control de Caja')
    .setDescription('Documentación de la API para el sistema de control de caja del restaurante')
    .setVersion('1.0')
    .addTag('control-caja') // Puedes añadir etiquetas según sea necesario
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configurar CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Permitir solo el frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.setGlobalPrefix('api');
  
  // Usar el ValidationPipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3001);
}

bootstrap();
