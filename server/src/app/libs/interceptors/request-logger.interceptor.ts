import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

export class RequestLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const logger = new Logger('Request Guard');
    const request = context.switchToHttp().getRequest();

    logger.log(`Request: ${request.method} ${request.url}`)

    if(request.body && Object.keys(request.body).length > 0) {
      logger.log('Request body:');
      logger.log(request.body);
    }

    return next.handle();
  }
}
