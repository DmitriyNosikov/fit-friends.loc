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
  ){
    super(entityFactory, dbClient);
  }
}