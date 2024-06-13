
import { Entity } from '../libs/entities';
import { AuthUserInterface, StorableEntityInterface } from '../libs/interfaces';
import { Gender, Location, TrainingTime, TrainingType, UserLevel } from '../libs/types';


export class UserEntity extends Entity implements StorableEntityInterface<AuthUserInterface> {
  public createdAt?: Date;
  public updatedAt?: Date;

  public email: string;
  public name: string;
  public passwordHash: string;
  public role?: string;
  public avatar?: string;
  public gender?: string;
  public birthDate?: Date;
  public description?: string;
  public location?: string;
  public pageBackground?: string;

  public level?: string;
  public trainingType?: string[];
  public trainingTime?: string;
  public loseCalories?: number;
  public dayCalories?: number;
  public isReadyToTraining?: boolean;
  
  constructor(user?: AuthUserInterface) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUserInterface) {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;

    this.email = user.email;
    this.name = user.name ?? '';
    this.passwordHash = user.passwordHash ?? '';
    this.role = user.role ?? '';
    this.avatar = user.avatar ?? '';
    this.gender = user.gender;
    this.birthDate = user.birthDate;
    this.description = user.description ?? '';
    this.location = user.location;
    this.pageBackground = user.pageBackground ?? '';

    // TODO: Возможно, вынести в отдельнгую сущность "Опросник"
    this.level = user.level;
    this.trainingType = user.trainingType;
    this.trainingTime = user.trainingTime;
    this.loseCalories = user.loseCalories;
    this.dayCalories = user.dayCalories;
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
      avatar: this.avatar,
      gender: this.gender as Gender,
      birthDate: this.birthDate,
      description: this.description,
      location: this.location as Location,

      level: this.level as UserLevel,
      trainingType: this.trainingType as TrainingType[],
      trainingTime: this.trainingTime as TrainingTime,
      loseCalories: this.loseCalories,
      dayCalories: this.dayCalories,
      isReadyToTraining: this.isReadyToTraining,
    };
  }
}
