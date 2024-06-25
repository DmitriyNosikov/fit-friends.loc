import { Injectable } from '@nestjs/common';

import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { BasePostgresRepository } from '../libs/data-access';

import { TrainingReviewInterface } from './interfaces';
import { TrainingReviewFactory } from './training-reviews.factory';
import { TrainingReviewEntity } from './training-review.entity';

@Injectable()
export class TrainingReviewRepository extends BasePostgresRepository<TrainingReviewEntity, TrainingReviewInterface> {
  constructor(
    entityFactory: TrainingReviewFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }

  public async findById(reviewId: string): Promise<TrainingReviewEntity | null> {
    const review = await this.dbClient.trainingReview.findFirst({
      where: { id: reviewId }
    });

    if(!review) {
      return null;
    }

    const reviewEntity = this.createEntityFromDocument(review as unknown as TrainingReviewInterface);

    return reviewEntity;
  }

  public async create(entity: TrainingReviewEntity): Promise<TrainingReviewEntity | null> {
    const review = await this.dbClient.trainingReview.create({
      data: entity
    });

    if(!review) {
      return null;
    }

    const reviewEntity = this.createEntityFromDocument(review as unknown as TrainingReviewInterface);

    return reviewEntity;
  }

  public async updateById(
    reviewId: string,
    fieldsToUpdate: Partial<TrainingReviewEntity>
  ): Promise<TrainingReviewEntity | null> {
    const updatedReview = await this.dbClient.trainingReview.update({
      where: { id: reviewId },
      data: { ...fieldsToUpdate }
    });

    if(!updatedReview) {
      return Promise.resolve(null);
    }

    const reviewEntity = this.createEntityFromDocument(updatedReview as unknown as TrainingReviewInterface);

    return reviewEntity;
  }

  public async deleteById(reviewId: string): Promise<void> {
    await this.dbClient.trainingReview.delete({
      where: { id: reviewId }
    });
  }

  public async exists(reviewId: string): Promise<boolean> {
    const review = await this.dbClient.trainingReview.findFirst({
      where: { id: reviewId }
    });

    if(!review) {
      return false;
    }

    return true;
  }
}
