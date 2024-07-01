import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { omitUndefined } from '@server/libs/helpers';
import { CreateTrainingReviewDTO, UpdateTrainingReviewDTO } from '@shared/training-review';
import { BaseSearchQuery, TrainingIdPayload } from '@shared/types';

import { TrainingReviewFactory } from './training-reviews.factory';
import { TrainingReviewRepository } from './training-review.repository';
import { TrainingReviewMessage } from './training-review.constant';
import { TrainingReviewEntity } from './training-review.entity';



@Injectable()
export class TrainingReviewService {
  constructor(
    private readonly trainingReviewFactory: TrainingReviewFactory,
    private readonly trainingReviewRepository: TrainingReviewRepository,
  ) {}
  public async findById(reviewId: string): Promise<TrainingReviewEntity | null> {
    const existsReview = await this.trainingReviewRepository.findById(reviewId);

    if(!existsReview) {
      throw new NotFoundException(`Training review with id ${reviewId} not found`);
    }

    return existsReview;
  }

  public async search(query?: BaseSearchQuery & TrainingIdPayload) {
    const reviews = await this.trainingReviewRepository.search(query);

    if(!reviews && query) {
      throw new NotFoundException(`Can't find reviews by passed params " ${query}"`);
    }

    return reviews;
  }

  public async create(dto: CreateTrainingReviewDTO) {
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

  //////////////////// Вспомогательные методы ////////////////////
  public async checkAccess(reviewId: string, userId: string): Promise<boolean | void> {
    const isUserHaveAccessToReview = await this.trainingReviewRepository.checkAccess(reviewId, userId);

    if (!isUserHaveAccessToReview) {
      throw new UnauthorizedException(`${TrainingReviewMessage.ERROR.HAVENT_ACCESS}. Passed review id: ${reviewId}`);
    }

    return true;
  }
}