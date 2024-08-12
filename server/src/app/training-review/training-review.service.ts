import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { omitUndefined } from '@server/libs/helpers';
import { CreateTrainingReviewDTO, UpdateTrainingReviewDTO } from '@shared/training-review';
import { BaseSearchQuery, TrainingIdPayload } from '@shared/types';

import { TrainingReviewFactory } from './training-reviews.factory';
import { TrainingReviewRepository } from './training-review.repository';
import { TrainingReviewMessage } from './training-review.constant';
import { TrainingReviewEntity } from './training-review.entity';
import { TrainingService } from '@server/training/training.service';



@Injectable()
export class TrainingReviewService {
  constructor(
    private readonly trainingReviewFactory: TrainingReviewFactory,
    private readonly trainingReviewRepository: TrainingReviewRepository,

    private readonly trainingService: TrainingService
  ) {}
  public async findById(reviewId: string): Promise<TrainingReviewEntity | null> {
    const existsReview = await this.trainingReviewRepository.findById(reviewId);

    if(!existsReview) {
      throw new NotFoundException(`Training review with id ${reviewId} not found`);
    }

    return existsReview;
  }

  public async findByTrainingId(trainingId: string): Promise<TrainingReviewEntity[] | null> {
    const existsReviews = await this.trainingReviewRepository.findByTrainingId(trainingId);

    if(!existsReviews) {
      throw new NotFoundException(`Not fount any reviews for training ${trainingId}`);
    }

    return existsReviews;
  }

  public async search(query?: BaseSearchQuery & TrainingIdPayload) {
    const reviews = await this.trainingReviewRepository.search(query);

    if(!reviews && query) {
      throw new NotFoundException(`Can't find reviews by passed params "${query}"`);
    }

    return reviews;
  }

  public async create(dto: CreateTrainingReviewDTO) {
    const isTrainingExists = await this.trainingService.exists(dto.trainingId);

    if(!isTrainingExists) {
      throw new NotFoundException(`Training with id ${dto.trainingId} not found`);
    }

    const reviewEntity = this.trainingReviewFactory.create(dto);
    const review  = await this.trainingReviewRepository.create(reviewEntity);

    // Пересчитываем рейтинг для тренировки
    await this.updateTrainingRating(dto.trainingId);

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

    // Если рейтинг обновился - пересчитать его у тренировки
    if(dto.rating) {
      let trainingId = null;
      
      if(dto.trainingId) {
        trainingId = dto.trainingId;
      } else {
        const existsReview = await this.trainingReviewRepository.findById(reviewId);

        trainingId = existsReview.trainingId;
      }

      if(trainingId) {
        // Пересчитываем рейтинг для тренировки
        await this.updateTrainingRating(trainingId);
      }
    }

    return updatedReview;
  }

  
  public async delete(reviewId: string): Promise<void> {
    const existsReview = await this.trainingReviewRepository.findById(reviewId);

    if(!existsReview) {
      return;
    }

    await this.trainingReviewRepository.deleteById(reviewId);

    // Пересчитываем рейтинг для тренировки
    await this.updateTrainingRating(existsReview.trainingId);
  }

  //////////////////// Вспомогательные методы ////////////////////
  public async checkAccess(reviewId: string, userId: string): Promise<boolean | void> {
    const isUserHaveAccessToReview = await this.trainingReviewRepository.checkAccess(reviewId, userId);

    if (!isUserHaveAccessToReview) {
      throw new UnauthorizedException(`${TrainingReviewMessage.ERROR.HAVENT_ACCESS}. Passed review id: ${reviewId}`);
    }

    return true;
  }

  public async recountRating(trainingId: string) {
    const reviews = await this.trainingReviewRepository.findByTrainingId(trainingId);

    if(!reviews || reviews.length <= 0) {
      return;
    }

    const generalRating: number = reviews.reduce((accumulator, item) => {
      return accumulator += item.rating;
    }, 0);

    const ratingAverage = Math.round(generalRating / reviews.length);

    return ratingAverage;
  }

  public async updateTrainingRating(trainingId: string) {
    const newRating = await this.recountRating(trainingId);

    await this.trainingService.updateById(trainingId, { rating: newRating });

    console.log('NEW RATING: ', newRating);
  }
}