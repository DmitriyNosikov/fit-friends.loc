import { Entity } from '@server/libs/entities';
import { StorableEntityInterface } from '@server/libs/interfaces';
import { BalanceInterface } from './interfaces/balance.interface';
import { TrainingInterface } from '@server/training/interfaces';
import { UserInterface } from '@server/user/interfaces';

export class BalanceEntity extends Entity implements StorableEntityInterface<BalanceInterface> {
  public createdAt?: Date;
  public updatedAt?: Date;

  public trainingId: TrainingInterface['id']
  public userId: UserInterface['id']
  public remainingTrainingsCount: number;

  constructor(balance?: BalanceInterface) {
    super();
    this.populate(balance);
  }

  populate(balance: BalanceInterface) {
    if (!balance) {
      return;
    }

    this.id = balance.id;
    this.createdAt = balance.createdAt;
    this.updatedAt = balance.updatedAt;

    this.trainingId = balance.trainingId;
    this.userId = balance.userId;
    this.remainingTrainingsCount = balance.remainingTrainingsCount;
  }

  toPOJO(): BalanceInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      trainingId: this.trainingId,
      userId: this.userId,
      remainingTrainingsCount: this.remainingTrainingsCount,
    };
  }
}