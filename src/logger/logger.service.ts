import { Injectable, Logger } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  format: format.combine(format.simple()),
  transports: [
    new transports.File({
      filename: 'app.log',
    }),
  ],
});

@Injectable()
export class LoggerService extends Logger {
  constructor() {
    super('App', true);
  }

  log(message: any, context: string = 'App') {
    const msg =
      message && typeof message === 'object'
        ? JSON.stringify(message, null, 2)
        : message;
    const log = `[Nest] ${process.pid}   - ${new Date(
      Date.now(),
    ).toLocaleString()}   [${context}] ${msg}`;
    logger.info(log);
    super.log(message, context);
  }
  warn(message: any, context: string = 'App') {
    const msg =
      message && typeof message === 'object'
        ? JSON.stringify(message, null, 2)
        : message;
    const log = `[Nest] ${process.pid}   - ${new Date(
      Date.now(),
    ).toLocaleString()}   [${context}] ${msg}`;
    logger.warn(log);
    super.warn(message, context);
  }
  error(message: any, trace?: string, context: string = 'App') {
    const msg =
      message && typeof message === 'object'
        ? JSON.stringify(message, null, 2)
        : message;
    const log = `[Nest] ${process.pid}   - ${new Date(
      Date.now(),
    ).toLocaleString()}   [${context}] ${msg}`;
    logger.error(log);
    logger.error(trace);
    super.error(message, trace, context);
  }
}
