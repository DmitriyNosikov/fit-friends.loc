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

  public async findById(userId: string): Promise<TrainingReviewEntity | null> {
    const user = await this.dbClient.user.findFirst({
      where: { id: userId }
    });

    if(!user) {
      return null;
    }

    const userEntity = this.createEntityFromDocument(user as unknown as UserInterface);

    return userEntity;
  }

  public async create(entity: TrainingReviewEntity): Promise<TrainingReviewEntity | null> {}

  public async updateById(
    reviewId: string,
    fieldsToUpdate: Partial<TrainingReviewEntity>
  ): Promise<TrainingReviewEntity | null> {}

  public async deleteById(reviewId: string): Promise<void> {}

  public async exists(reviewId: string): Promise<boolean> {}
}
