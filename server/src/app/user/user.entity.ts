
import { TrainingDuration } from '@server/libs/types/training-duration.enum';
import { Entity } from '../libs/entities';
import { StorableEntityInterface } from '../libs/interfaces';
import { AuthUserInterface } from './interfaces';
import { Gender, Location, TrainingType, UserLevel, UserRole } from '../libs/types';


export class UserEntity extends Entity implements StorableEntityInterface<AuthUserInterface> {
  public createdAt?: Date;
  public updatedAt?: Date;

  public email: string;
  public name: string;
  public passwordHash: string;
  public role?: UserRole;
  public avatar?: string;
  public gender: Gender;
  public birthDate?: Date;
  public description?: string;
  public location: Location;
  public pageBackground?: string;

  public level?: UserLevel;
  public trainingType?: TrainingType[];
  public trainingDuration?: TrainingDuration;
  public loseCaloriesLimit?: number;
  public dayCaloriesLimit?: number;
  public isReadyToTraining?: boolean;
  
  constructor(user?: AuthUserInterface) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUserInterface) {
    if (!user) {
      return;
    }

    this.id = user.id;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;

    this.email = user.email;
    this.name = user.name ?? '';
    this.passwordHash = user.passwordHash ?? '';
    this.role = user.role;
    this.avatar = user.avatar ?? '';
    this.gender = user.gender;
    this.birthDate = user.birthDate;
    this.description = user.description ?? '';
    this.location = user.location;
    this.pageBackground = user.pageBackground ?? this.avatar;

    // TODO: Возможно, вынести в отдельную сущность "Опросник"
    this.level = user.level;
    this.trainingType = user.trainingType;
    this.trainingDuration = user.trainingDuration;
    this.loseCaloriesLimit = user.loseCaloriesLimit;
    this.dayCaloriesLimit = user.dayCaloriesLimit;
    this.isReadyToTraining = user.isReadyToTraining;
  }

  public setPassword(password: string) {
    this.passwordHash = password;
  }

  // TODO: Решить проблему с кастингом типов
  public toPOJO(): AuthUserInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      name: this.name,
      email: this.email,
      passwordHash: this.passwordHash,
      role: this.role,
      avatar: this.avatar,
      gender: this.gender,
      birthDate: this.birthDate,
      description: this.description,
      location: this.location,

      level: this.level,
      trainingType: this.trainingType,
      trainingDuration: this.trainingDuration,
      loseCaloriesLimit: this.loseCaloriesLimit,
      dayCaloriesLimit: this.dayCaloriesLimit,
      isReadyToTraining: this.isReadyToTraining,
    };
  }
}
