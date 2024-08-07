import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { TrainingFactory } from './training.factory';
import { TrainingEntity } from './training.entity';
import { TrainingMessage, TrainingValidation } from './training.constant';
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

    // Сортировка тренировок пользователя от более подходящих к менее подходящим 
    // (Если не передана другая сортировка)
    if(!query.sortType) {
      trainings.entities = await this.sortTrainingsByUser(query.userId, trainings.entities);
    }

    return trainings;
  }

  public async create(dto: CreateTrainingDTO) {
    // Если на тренировку есть скидка
    // Она становится спец. предложением
    if(dto.discount) {
      dto.isSpecial = true;
    }

    // Автоматически подставляем имя создателя тренировки
    const userId = dto.userId;
    const userInfo = await this.userService.findById(userId);

    if(userInfo && !dto.trainersName) {
      dto.trainersName = userInfo.name;
    }

    const trainingEntity = this.trainingFactory.create(dto);
    const training = await this.trainingRepository.create(trainingEntity);

    return training;
  }


  public async updateById(trainingId: string, fieldsToUpdate: UpdateTrainingDTO) {
    const isTrainingExists = await this.trainingRepository.exists(trainingId);

    if (!isTrainingExists) {
      throw new NotFoundException(`${TrainingMessage.ERROR.NOT_FOUND}. Passed ID: ${trainingId}`);
    }

    // Если на тренировку есть скидка
    // Она становится спец. предложением
    if(fieldsToUpdate.discount) {
      fieldsToUpdate.isSpecial = true;
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

  public async getTrainingsWithDiscount() {
    const searchQuery: TrainingSearchQuery = { withDiscount: true };
    const trainings = await this.trainingRepository.search(searchQuery);

    if (!trainings) {
      return;
    }

    return trainings;
  }

  public async getTrainingsWithRating() {
    const searchQuery: TrainingSearchQuery = {
      ratingFrom: 1,
      ratingTo: TrainingValidation.RATING.MAX
    };
    const trainings = await this.trainingRepository.search(searchQuery);

    if (!trainings) {
      return;
    }

    return trainings;
  }

  public async getTrainingsForUser(userId: string) {
    const userInfo = await this.userService.findById(userId);
    const searchQuery = {
      trainingType: userInfo.trainingType,
      trainingDuration: userInfo.trainingDuration,
      level: userInfo.level,
      dayCaloriesTo: userInfo.dayCaloriesLimit
    };
    const filteredQuery = this.filterQuery(searchQuery);

    const convenientTrainings = await this.trainingRepository.getTrainingsForUser(filteredQuery);

    if (!convenientTrainings) {
      return;
    }

    // Сортировка тренировок пользователя от более подходящих к менее подходящим
    convenientTrainings.entities = await this.sortTrainingsByUser(userId, convenientTrainings.entities);

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

      // Возвращаем результат сравнения
      // Если тренировка А подходит больше - ее вес будет больше, чем тренировка B и наоборот
      // A - B -> От менее подходящих к более подходящим
      // B - A -> От более подходящих к менее подходящим
      return trainingBWeight- trainingAWeight;
    });

    return sortedTrainings;
  }

  public async getTrainingFilterParams() {
    const trainingsList = await this.trainingRepository.findAll();

    if(!trainingsList) {
      return;
    }

    const pricesList = [];
    const caloriesList = [];

    trainingsList.forEach((training) => {
      const { price, calories } = training;
      
      if(!pricesList.includes(price)) {
        pricesList.push(price);
      }

      if(!caloriesList.includes(calories)) {
        caloriesList.push(calories);
      }
    });
    
    const filterParams = {
      price: {
        min: Math.min(...pricesList),
        max: Math.max(...pricesList),
      },

      calories: {
        min: Math.min(...caloriesList),
        max: Math.max(...caloriesList),
      },
    }

    return filterParams;
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