import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {HttpExceptionFilter} from "./exceptions/all-exceptions.filter";
import {BadRequestException, ValidationError, ValidationPipe} from "@nestjs/common";
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: errors => {
          const result = {
            message: Object.values(errors[0].constraints)[0],
          };
          return new BadRequestException(result);
        },
        stopAtFirstError: true,
        whitelist: true,
      })
  );
  await app.listen(3000);
}
bootstrap();
