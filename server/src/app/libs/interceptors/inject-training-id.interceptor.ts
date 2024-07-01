import {
  CallHandler,
  ExecutionContext,
  NestInterceptor
} from '@nestjs/common';

export class InjectTrainingIdInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    request.body['trainingId'] = request.params.trainingId;

    return next.handle();
  }
}
