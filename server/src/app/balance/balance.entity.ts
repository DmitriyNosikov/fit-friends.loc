import { Entity } from '@server/libs/entities';
import { StorableEntityInterface } from '@server/libs/interfaces';
import { BalanceInterface } from './interfaces/balance.interface';
import { TrainingInterface } from '@server/training/interfaces';
import { UserInterface } from '@server/user/interfaces';

type TrainingInfo = {
  training?: TrainingInterface
};
export class BalanceEntity extends Entity implements StorableEntityInterface<BalanceInterface> {
  public createdAt?: Date;
  public updatedAt?: Date;

  public trainingId: TrainingInterface['id']
  public userId: UserInterface['id']
  public remainingTrainingsCount: number;
  public hasTrainingStarted: boolean;

  public trainingInfo?: TrainingInterface;

  constructor(balance?: BalanceInterface) {
    super();
    this.populate(balance);
  }

  populate(balance: BalanceInterface & TrainingInfo) {
    if (!balance) {
      return;
    }

    this.id = balance.id;
    this.createdAt = balance.createdAt;
    this.updatedAt = balance.updatedAt;

    this.trainingId = balance.trainingId;
    this.userId = balance.userId;
    this.remainingTrainingsCount = balance.remainingTrainingsCount;
    this.hasTrainingStarted = balance.hasTrainingStarted ?? false;

    this.trainingInfo = balance.training;
  }

  toPOJO(): BalanceInterface & { trainingInfo: TrainingInterface } {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      trainingId: this.trainingId,
      userId: this.userId,
      remainingTrainingsCount: this.remainingTrainingsCount,
      hasTrainingStarted: this.hasTrainingStarted,

      trainingInfo: this.trainingInfo
    };
  }
}