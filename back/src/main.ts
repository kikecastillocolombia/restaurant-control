import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configurar CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Permitir solo el frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Establecer el prefijo global
  app.setGlobalPrefix('api');

  // Usar el ValidationPipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Control de Caja')
    .setDescription('Documentación de la API para el sistema de control de caja del restaurante')
    .setVersion('1.0')
    .addTag('control-caja') // Puedes añadir etiquetas según sea necesario
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Ajustar la ruta de Swagger para que incluya el prefijo global
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3001);
}

bootstrap();
