import {
  Module,
  MiddlewareConsumer,
  NestModule,
  UseFilters,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterielTypesModule } from './materiel-types/materiel-types.module';
import { LoggerModule } from './logger/logger.module';
import { RequestLoggerMiddleware } from './common/request-logger.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(), MaterielTypesModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
