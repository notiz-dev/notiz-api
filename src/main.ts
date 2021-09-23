import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // swagger
  const options = new DocumentBuilder()
    .setTitle('notiz.dev')
    .setDescription('notiz.dev api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    operationIdFactory: (_, methodKey) => methodKey,
  });
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'notiz.dev API',
  });

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
