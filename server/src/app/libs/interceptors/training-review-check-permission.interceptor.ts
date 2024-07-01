import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { TrainingReviewService } from '@server/training-review/training-review.service';

@Injectable()
export class TrainingReviewCheckPermissionInterceptor implements NestInterceptor {
  constructor(
    private readonly reviewService: TrainingReviewService
  ) { }

  public async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;
    const reviewId = request.params.reviewId;

    await this.reviewService.checkAccess(reviewId, userId);

    return next.handle();
  }
}
