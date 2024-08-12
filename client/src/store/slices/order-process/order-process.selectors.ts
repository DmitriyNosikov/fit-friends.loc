import { Namespace } from '@client/src/const';
import { OrderStateNamespace } from '@client/src/types/selector';
import { OrdersWithPaginationRDO } from '@shared/order';

// Lists
export function getOrdersList(state: OrderStateNamespace): OrdersWithPaginationRDO | null {
  return state[Namespace.ORDER].paginatedOrders;
}

// Loading statuses
export function getOrdersListLoadingStatus(state: OrderStateNamespace): boolean {
  return state[Namespace.ORDER].isOrdersLoading;
}
