import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config(); // doit être avant toute utilisation de Prisma

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  console.log('DATABASE_URL =>', process.env.DATABASE_URL);

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
