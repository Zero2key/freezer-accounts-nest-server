import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(@Inject(LoggerService) readonly logger: LoggerService) {}

  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const now = Date.now();
    return call$.pipe(
      map(data => ({ code: 1, data })),
      tap(() => {
        this.logger.log(
          `${req.protocol}://${req.hostname}${req.url} - ${Date.now() - now}ms`,
          `Req:${req.method}`,
        );
      }),
    );
  }
}
