import { CreatedUpdatedDatesInterface } from '@server/libs/interfaces';
import { OrderInterface } from '@server/order/interfaces/order.interface';

export interface BalanceInterface extends CreatedUpdatedDatesInterface {
  id?: string;
  orderId: OrderInterface['id'];
  remainingTrainingsCount: number;
}