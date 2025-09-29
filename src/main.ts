import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseTransformInterceptor } from './common/interceptors/response.interceptor';
import { PinoLogger } from './logger/pino-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: PinoLogger.getInstance(),
  });
  app.useGlobalInterceptors(new ResponseTransformInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
