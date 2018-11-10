import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterielTypesModule } from './materiel-types/materiel-types.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [TypeOrmModule.forRoot(), MaterielTypesModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
