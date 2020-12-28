import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { JwtMiddleware } from './jwt/jwt.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  // app.useGlobalPipes(new ValidationPipe());
  app.useLogger(new Logger());
  app.enableCors();
  await app.listen(process.env.PORT).then(() => console.log(process.env.PORT));
}
bootstrap();
