import { BasePostgresRepository } from '@server/libs/data-access';
import { TrainingEntity } from './training.entity';
import { TrainingInterface } from './interfaces/training.interface';
import { TrainingFactory } from './training.factory';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TrainingRepository extends BasePostgresRepository<TrainingEntity, TrainingInterface> {
  constructor(
    entityFactory: TrainingFactory,
    readonly dbClient: PrismaClientService
  ) {
    super(entityFactory, dbClient);
  }


  public async findById(trainingId: string): Promise<TrainingEntity | null> {
    const training = await this.dbClient.training.findFirst({
      where: { id: trainingId }
    });

    if (!training) {
      return null;
    }

    return this.getEntity(training);
  }

  public async create(entity: TrainingEntity): Promise<TrainingEntity | null> {
    const training = await this.dbClient.training.create({
      data: entity
    });

    if (!training) {
      return null;
    }

    return this.getEntity(training);
  }

  public async updateById(
    trainingId: string,
    fieldsToUpdate: Partial<TrainingEntity>
  ): Promise<TrainingEntity | null> {
    const updatedTraining = await this.dbClient.training.update({
      where: { id: trainingId },
      data: { ...fieldsToUpdate }
    });

    if (!updatedTraining) {
      return Promise.resolve(null);
    }

    return this.getEntity(updatedTraining);
  }

  public async deleteById(trainingId: string): Promise<void> {
    await this.dbClient.training.delete({
      where: { id: trainingId }
    });
  }

  public async exists(trainingId: string): Promise<boolean> {
    const training = await this.dbClient.training.findFirst({
      where: { id: trainingId }
    });

    if (!training) {
      return false;
    }

    return true;
  }

  private getEntity(document): TrainingEntity {
    return this.createEntityFromDocument(document as unknown as TrainingInterface);
  }
}