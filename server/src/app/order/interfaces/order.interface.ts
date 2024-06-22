import { CreatedUpdatedDatesInterface } from '@server/libs/interfaces';
import { OrderType } from '@server/libs/types';
import { PaymentType } from '@server/libs/types/payment-type.enum';
import { TrainingInterface } from '@server/training/interfaces/training.interface';
import { UserInterface } from '@server/user/interfaces';

export interface OrderInterface extends CreatedUpdatedDatesInterface {
  id?: string;
  type: OrderType;
  serviceId: TrainingInterface['id'];
  price: TrainingInterface['price'],
  trainingsCount: number;
  remainingTrainingsCount: number;
  totalPrice: number;
  paymentType: PaymentType;
  userId?: UserInterface['id'];
}