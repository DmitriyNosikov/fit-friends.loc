import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../prisma-client/prisma-client.service';

import { BasePostgresRepository } from '@server/libs/data-access';
import { TrainingRequestInterface } from './interfaces/training-request.interface';
import { TrainingRequestEntity } from './training-request.entity';
import { TrainingRequestFactory } from './training-request.factory';

@Injectable()
export class TrainingRequestRepository extends BasePostgresRepository<TrainingRequestEntity, TrainingRequestInterface> {
  constructor(
    entityFactory: TrainingRequestFactory,
    readonly dbClient: PrismaClientService
  ) {
    super(entityFactory, dbClient);
  }

  public async findById(requestId: string): Promise<TrainingRequestEntity | null> {
    const trainingRequest = await this.dbClient.trainingRequest.findFirst({
      where: { id: requestId }
    });

    if (!trainingRequest) {
      return null;
    }

    return this.getEntity(trainingRequest);
  }

  public async findByUserAndTrainerId(userId: string, trainerId: string): Promise<TrainingRequestEntity | null> {
    const trainingRequest = await this.dbClient.trainingRequest.findFirst({
      where: { initiatorId: userId, trainerId: trainerId }
    })

    if(!trainingRequest) {
      return null;
    }

    return this.getEntity(trainingRequest);
  }

  public async findTrainersRequests(trainerId: string): Promise<TrainingRequestEntity | null> {
    const trainingRequest = await this.dbClient.trainingRequest.findFirst({
      where: { trainerId }
    })

    if(!trainingRequest) {
      return null;
    }

    return this.getEntity(trainingRequest);
  }

  public async create(entity: TrainingRequestEntity): Promise<TrainingRequestEntity | null> {
    const trainingRequest = await this.dbClient.trainingRequest.create({
      data: entity
    });

    if (!trainingRequest) {
      return null;
    }

    return this.getEntity(trainingRequest);
  }

  public async updateById(
    requestId: string,
    fieldsToUpdate: Partial<TrainingRequestEntity>
  ): Promise<TrainingRequestEntity | null> {
    const updatedRequest = await this.dbClient.trainingRequest.update({
      where: { id: requestId },
      data: { ...fieldsToUpdate }
    });

    if (!updatedRequest) {
      return Promise.resolve(null);
    }

    return this.getEntity(updatedRequest);
  }

  public async deleteById(requestId: string): Promise<void> {
    await this.dbClient.trainingRequest.delete({
      where: { id: requestId }
    });
  }

  // Серивсные методы
  public async checkAccess(requestId: string, userId: string) {
    const request = await this.dbClient.trainingRequest.findFirst({
      where:  {
        OR: [
          { id: requestId, trainerId: userId },
          { id: requestId, initiatorId: userId },
        ]
      },
    });

    if(!request) {
      return false;
    }

    return true;
  }

  private getEntity(document): TrainingRequestEntity {
    return this.createEntityFromDocument(document as unknown as TrainingRequestInterface);
  }
}