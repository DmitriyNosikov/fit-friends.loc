import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TrainingReviewFactory } from './training-reviews.factory';
import { TrainingReviewRepository } from './training-review.repository';
import { CreateTrainingReviewDTO, UpdateTrainingReviewDTO } from '@shared/training-review';
import { TrainingService } from '@server/training/training.service';
import { UserService } from '@server/user/user.service';
import { TrainingReviewMessage } from './training-review.constant';
import { TrainingReviewEntity } from './training-review.entity';
import { omitUndefined } from '@server/libs/helpers';

@Injectable()
export class TrainingReviewService {
  constructor(
    private readonly trainingReviewFactory: TrainingReviewFactory,
    private readonly trainingReviewRepository: TrainingReviewRepository,
    private readonly trainingService: TrainingService,
    private readonly userService: UserService
  ) {}
  public async findById(reviewId: string): Promise<TrainingReviewEntity | null> {
    const existsReview = await this.trainingReviewRepository.findById(reviewId);

    if(!existsReview) {
      throw new NotFoundException(`Training review with id ${reviewId} not found`);
    }

    return existsReview;
  }

  public async create(dto: CreateTrainingReviewDTO) {
    const { userId, trainingId } = dto;
    const isTrainingExists = await this.trainingService.findById(trainingId);

    if(isTrainingExists) {
      throw new BadRequestException(`${TrainingReviewMessage.ERROR.TRAINING_NOT_FOUND}. Passed id: ${trainingId}`);
    }

    const isUserExists = await this.userService.findById(userId);

    if(isUserExists) {
      throw new BadRequestException(`${TrainingReviewMessage.ERROR.USER_NOT_FOUND}. Passed id: ${userId}`);
    }

    const reviewEntity = this.trainingReviewFactory.create(dto);
    const review  = await this.trainingReviewRepository.create(reviewEntity);

    return review;
  }

  public async update(
    reviewId: string,
    dto: UpdateTrainingReviewDTO
  ) {
    const fieldsToUpdate = omitUndefined(dto as Record<string, unknown>);

    if(Object.keys(fieldsToUpdate).length <= 0) {
      throw new BadRequestException(TrainingReviewMessage.ERROR.CANT_UPDATE);
    }

    const updatedReview = await this.trainingReviewRepository.updateById(reviewId, fieldsToUpdate);

    return updatedReview;
  }

  
  public async delete(reviewId: string): Promise<void> {
    const isReviewExists = await this.trainingReviewRepository.exists(reviewId);

    if(!isReviewExists) {
      return;
    }

    return await this.trainingReviewRepository.deleteById(reviewId);
  }
}