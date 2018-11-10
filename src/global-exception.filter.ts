import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    this.logger.error(exception.message, exception.stack, 'GlobalException');

    response.status(200).json({
      code: -1,
      exception: exception.message,
      path: request.url,
    });
  }
}
