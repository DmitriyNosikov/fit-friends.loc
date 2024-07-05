import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { TrainingFactory } from './training.factory';
import { TrainingEntity } from './training.entity';
import { TrainingMessage } from './training.constant';
import { CreateTrainingDTO, TrainingSearchQuery, UpdateTrainingDTO } from '@shared/training';
import { fillDTO, omitUndefined } from '@server/libs/helpers';
import { UserService } from '@server/user/user.service';

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly trainingFactory: TrainingFactory,
    private readonly userService: UserService,
  ) { }

  public async findById(trainingId: string): Promise<TrainingEntity | null> {
    const training = await this.trainingRepository.findById(trainingId);
    console.log('TRAINING ID: ', trainingId, training);

    if (!training) {
      throw new NotFoundException(`${TrainingMessage.ERROR.NOT_FOUND}. ID: ${trainingId}`);
    }

    return training;
  }

  public async search(query?: TrainingSearchQuery) {
    const trainings = await this.trainingRepository.search(query);

    if(!trainings && query) {
      throw new NotFoundException(`Can't find products by passed params " ${query}"`);
    }

    return trainings;
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

  public async getTrainingsForUser(userId: string) {
    const userInfo = await this.userService.findById(userId);
    const { trainingType, trainingDuration, level, dayCaloriesLimit } = userInfo;

    const searchQuery = { trainingType, trainingDuration, level, dayCaloriesTo: dayCaloriesLimit };
    const filteredQuery = this.filterQuery(searchQuery);

    const convenientTrainings = await this.trainingRepository.getTrainingsForUser(filteredQuery);

    if(!convenientTrainings) {
      return;
    }

    return convenientTrainings;
  }

  public async exists(trainingId: string): Promise<boolean> {
    const isTrainingExists = await this.trainingRepository.exists(trainingId);

    if(!isTrainingExists) {
      return false;
    }

    return true;
  }

  public filterQuery(query: TrainingSearchQuery) {
    const filteredQuery = fillDTO(TrainingSearchQuery, query);
    const omitedQuery = omitUndefined(filteredQuery as Record<string, unknown>);

    if(query.isSpecial !== undefined && query.isSpecial !== null) {
      omitedQuery.isSpecial = query.isSpecial
    }

    return omitedQuery;
  }
}