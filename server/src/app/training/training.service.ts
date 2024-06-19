import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { TrainingFactory } from './training.factory';
import { TrainingEntity } from './training.entity';
import { TrainingMessage } from './training.constant';
import { CreateTrainingDTO, UpdateTrainingDTO } from '@shared/training';

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly trainingFactory: TrainingFactory,
  ) { }


  public async getTrainingDetail(trainingId: string): Promise<TrainingEntity | null> {
    const training = await this.trainingRepository.findById(trainingId);

    if (!training) {
      throw new NotFoundException(TrainingMessage.ERROR.NOT_FOUND);
    }

    return training;
  }

  public async create(dto: CreateTrainingDTO) {
    const trainingEntity = this.trainingFactory.create(dto);
    const training = await this.trainingRepository.create(trainingEntity);

    return training;
  }

  
  public async updateById(trainingId: string, fieldsToUpdate: UpdateTrainingDTO) {
    const isTrainingExists = await this.trainingRepository.exists(trainingId);

    if(!isTrainingExists) {
      throw new NotFoundException(`${TrainingMessage.ERROR.NOT_FOUND}. Passed ID: ${trainingId}`);
    }

    const updatedTraining = await this.trainingRepository.updateById(trainingId, fieldsToUpdate);

    return updatedTraining;
  }

  public async deleteTraining(trainingId: string): Promise<void> {
    const isTrainingExists = await this.trainingRepository.exists(trainingId);

    if (!isTrainingExists) {
      return;
    }

    return await this.trainingRepository.deleteById(trainingId);
  }
}