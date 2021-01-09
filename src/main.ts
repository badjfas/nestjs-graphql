import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  console.log(process.env.NODE_ENV);
  await app.listen(process.env.PORT).then(() => console.log(process.env.PORT));
}
bootstrap();
