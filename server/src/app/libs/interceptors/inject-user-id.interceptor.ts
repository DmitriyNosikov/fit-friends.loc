import {
  CallHandler,
  ExecutionContext,
  NestInterceptor
} from '@nestjs/common';

export class InjectUserIdInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    request.body['userId'] = request.user.userId;

    return next.handle();
  }
}
