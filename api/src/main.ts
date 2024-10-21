import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Motor insurance API')
    .setDescription(
      'This API allows for creating, reading, updating, and deleting motor insurance packages.'
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger-ui', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json'
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
