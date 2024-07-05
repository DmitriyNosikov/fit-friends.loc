import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { TrainingFactory } from './training.factory';
import { TrainingEntity } from './training.entity';
import { TrainingMessage } from './training.constant';
import { CreateTrainingDTO, TrainingSearchQuery, UpdateTrainingDTO } from '@shared/training';
import { fillDTO, omitUndefined } from '@server/libs/helpers';
import { UserService } from '@server/user/user.service';
import { UserIdPayload } from '@shared/types';

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly trainingFactory: TrainingFactory,
    private readonly userService: UserService,
  ) { }

  public async findById(trainingId: string): Promise<TrainingEntity | null> {
    const training = await this.trainingRepository.findById(trainingId);

    if (!training) {
      throw new NotFoundException(`${TrainingMessage.ERROR.NOT_FOUND}. ID: ${trainingId}`);
    }

    return training;
  }

  public async search(query?: TrainingSearchQuery & UserIdPayload) {
    const preparedQuery = this.filterQuery(query);
    const trainings = await this.trainingRepository.search(preparedQuery);

    if (!trainings && query) {
      throw new NotFoundException(`Can't find products by passed params " ${preparedQuery}"`);
    }

    trainings.entities = await this.sortTrainingsByUser(query.userId, trainings.entities);
    console.log('SORTED TRAININGS: ', await this.sortTrainingsByUser(query.userId, trainings.entities));

    return trainings;
  }

  public async create(dto: CreateTrainingDTO) {
    const trainingEntity = this.trainingFactory.create(dto);
    const training = await this.trainingRepository.create(trainingEntity);

    return training;
  }


  public async updateById(trainingId: string, fieldsToUpdate: UpdateTrainingDTO) {
    const isTrainingExists = await this.trainingRepository.exists(trainingId);

    if (!isTrainingExists) {
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

    if (!convenientTrainings) {
      return;
    }

    return convenientTrainings;
  }

  public async sortTrainingsByUser(userId: string, trainings: TrainingEntity[]) {
    const userInfo = await this.userService.findById(userId);
    const { trainingType, trainingDuration, level, dayCaloriesLimit } = userInfo;

     // Сортировка тренировок от более подходящих для пользователя к менее подходящим
    const sortedTrainings = trainings.sort(function (trainingA: TrainingEntity, trainingB: TrainingEntity) {
      // Делаем все на основе весов
      let trainingAWeight = 0;
      let trainingBWeight = 0;

      // Сравниваем по типам тренировок
      if (trainingType.length > 0) {
        trainingType.forEach((type) => {
          if (trainingA.trainingType.includes(type)) {
            trainingAWeight += 1;
          }

          if (trainingB.trainingType.includes(type)) {
            trainingBWeight += 1;
          }
        });
      }

      // По длительности (в упрощенном варианте)
      if (trainingDuration === trainingA.trainingDuration) {
        trainingAWeight += 1;
      }

      if (trainingDuration === trainingB.trainingDuration) {
        trainingBWeight += 1;
      }

      // По уровню (в упрощенном варианте)
      // по хорошему, должны подходить все тренировки ниже текущего уровня юзера
      if (level === trainingA.userLevel) {
        trainingAWeight += 1;
      }

      if (level === trainingB.userLevel) {
        trainingBWeight += 1;
      }

      // По калориям
      if (dayCaloriesLimit <= trainingA.calories) {
        trainingAWeight += 1;
      }

      if (dayCaloriesLimit <= trainingB.calories) {
        trainingBWeight += 1;
      }

      console.log(`WEIGHTS: A[${trainingA.id}]: ${trainingAWeight} | B[${trainingB.id}]: ${trainingBWeight}`);

      // Возвращаем результат сравнения
      // Если тренировка А подходит больше - ее вес будет больше, чем тренировка B и наоборот
      // A - B -> От менее подходящих к более подходящим
      // B - A -> От более подходящих к менее подходящим
      return trainingBWeight- trainingAWeight;
    });

    return sortedTrainings;
  }

  public async exists(trainingId: string): Promise<boolean> {
    const isTrainingExists = await this.trainingRepository.exists(trainingId);

    if (!isTrainingExists) {
      return false;
    }

    return true;
  }

  public filterQuery(query: TrainingSearchQuery) {
    const filteredQuery = fillDTO(TrainingSearchQuery, query);
    const omitedQuery = omitUndefined(filteredQuery as Record<string, unknown>);

    if (query.isSpecial !== undefined && query.isSpecial !== null) {
      omitedQuery.isSpecial = query.isSpecial
    }

    return omitedQuery;
  }
}