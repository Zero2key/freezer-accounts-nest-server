import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseInterceptor } from './common/response.interceptor';
import { MaterielTypesModule } from './materiel-types/materiel-types.module';
import { LoggerModule } from './logger/logger.module';
import { RequestLoggerMiddleware } from './common/request-logger.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(), MaterielTypesModule, LoggerModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
