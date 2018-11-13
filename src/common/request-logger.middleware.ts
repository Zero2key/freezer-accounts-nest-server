import {
  Injectable,
  MiddlewareFunction,
  NestMiddleware,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(@Inject(LoggerService) readonly logger: LoggerService) {}

  resolve(): MiddlewareFunction<Request> {
    return (req, res, next) => {
      this.logger.log(`${req.protocol}://${req.hostname}${req.baseUrl}`, 'Req');
      next();
    };
  }
}
