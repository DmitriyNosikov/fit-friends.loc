
import { UserInterface } from '@server/user/interfaces';
import { Entity } from '../libs/entities';
import { StorableEntityInterface } from '../libs/interfaces';
import { TrainingReviewInterface } from './interfaces';
import { TrainingInterface } from '@server/training/interfaces/training.interface';

export class TrainingReviewEntity extends Entity implements StorableEntityInterface<TrainingReviewInterface> {
  public createdAt?: Date;
  public updatedAt?: Date;

  public userId: UserInterface['id'];
  public trainingId: TrainingInterface['id'];
  public rating: number;
  public text: string;
  
  public userInfo?: UserInterface;
  
  constructor(review?: TrainingReviewInterface) {
    super();
    this.populate(review);
  }

  public populate(review?: TrainingReviewInterface & { user?: UserInterface }) {
    if (!review) {
      return;
    }

    this.id = review.id;
    this.createdAt = review.createdAt;
    this.updatedAt = review.updatedAt;

    this.userId = review.userId;
    this.trainingId = review.trainingId;
    this.rating = review.rating;
    this.text = review.text;

    // Храним доп. инфу о юзере в свойстве userInfo вместо user
    // т.к. из за того, что призма строит зависимости и выводит сущности сама,
    // в ее типах уже хранится свойство user для создания зависимостей, и мы
    // не можем использовать его в своих целях
    this.userInfo = review.user;
  }

  public toPOJO(): TrainingReviewInterface & { userInfo?: UserInterface } {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      userId: this.userId,
      trainingId: this.trainingId,
      rating: this.rating,
      text: this.text,

      userInfo: this.userInfo,
    };
  }
}
