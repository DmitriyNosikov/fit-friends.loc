import { StorableEntityInterface } from '@server/libs/interfaces';
import { TrainingRequestInterface } from './interfaces/training-request.interface';
import { UserInterface } from '@server/user/interfaces';
import { TrainingRequestStatus } from '@shared/types/training-request-status.enum';
import { Entity } from '@server/libs/entities';

export class TrainingRequestEntity extends Entity implements StorableEntityInterface<TrainingRequestInterface> {
  public createdAt?: Date;
  public updatedAt?: Date;

  public initiatorId: UserInterface['id']
  public trainerId: UserInterface['id']
  public status: TrainingRequestStatus

  public initiatorInfo?: UserInterface;
  public trainerInfo?: UserInterface;

  constructor(request?: TrainingRequestInterface) {
    super();
    this.populate(request);
  }

  populate(request?: TrainingRequestInterface & {
    initiator?: UserInterface,
    trainer?: UserInterface
  }) {
    if(!request) {
      return;
    }

    this.id = request.id;
    this.createdAt = request.createdAt;
    this.updatedAt = request.updatedAt;

    this.initiatorId = request.initiatorId;
    this.trainerId = request.trainerId;
    this.status = request.status;

    this.initiatorInfo = request.initiator;
    this.trainerInfo = request.trainer;
  }

  toPOJO(): TrainingRequestInterface & {
    initiatorInfo?: UserInterface,
    trainerInfo?: UserInterface
  } {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      initiatorId: this.initiatorId,
      trainerId: this.trainerId,
      status: this.status,

      initiatorInfo: this.initiatorInfo,
      trainerInfo: this.trainerInfo,
    };
  }
}