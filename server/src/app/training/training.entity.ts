import { Entity } from '@server/libs/entities';
import { StorableEntityInterface } from '@server/libs/interfaces';
import { TrainingInterface } from './interfaces/training.interface';
import { Gender, TrainingDuration, TrainingType, UserLevel } from '@server/libs/types';
import { UserInterface } from '@server/user/interfaces';

export class TrainingEntity extends Entity implements StorableEntityInterface<TrainingInterface> {
  public createdAt?: Date;
  public updatedAt?: Date;

  public title: string;
  public background: string;
  public userLevel: UserLevel;
  public trainingType: TrainingType;
  public trainingDuration: TrainingDuration;
  public price: number;
  public discount?: number;
  public calories: number;
  public description: string;
  public gender: Gender;
  public video: string;
  public rating?: number;
  public trainersName: string;
  public isSpecial?: boolean;

  public userId: UserInterface['id'];
  public userInfo?: UserInterface;

  constructor(training?: TrainingInterface) {
    super();
    this.populate(training);
  }

  populate(training: TrainingInterface & { user?: UserInterface }) {
    if (!training) {
      return;
    }

    this.id = training.id;
    this.createdAt = training.createdAt;
    this.updatedAt = training.updatedAt;

    this.title = training.title;
    this.background = training.background;
    this.userLevel = training.userLevel;
    this.trainingType = training.trainingType;
    this.trainingDuration = training.trainingDuration;
    this.price = training.price;
    this.discount = training.discount;
    this.calories = training.calories;
    this.description = training.description;
    this.gender = training.gender;
    this.video = training.video;
    this.rating = training.rating;
    this.trainersName = training.trainersName;
    this.isSpecial = training.isSpecial ?? false;

    this.userId = training.userId;
    this.userInfo = training.user;
  }

  toPOJO(): TrainingInterface & { userInfo?: UserInterface } {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      title: this.title,
      background: this.background,
      userLevel: this.userLevel,
      trainingType: this.trainingType,
      trainingDuration: this.trainingDuration,
      price: this.price,
      discount: this.discount,
      calories: this.calories,
      description: this.description,
      gender: this.gender,
      video: this.video,
      rating: this.rating,
      trainersName: this.trainersName,
      isSpecial: this.isSpecial,

      userId: this.userId,
      userInfo: this.userInfo,
    };
  }
}