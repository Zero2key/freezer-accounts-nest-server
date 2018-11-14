import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filter/global-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });
  app.enableCors({
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.useLogger(app.get(LoggerService));
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(LoggerService)));
  const options = new DocumentBuilder()
    .setTitle('Freezer Accounts Example')
    .setDescription('The freezer accounts API description')
    .setVersion('0.0.2')
    .setBasePath('api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  await app.listen(3000);
}
bootstrap();
