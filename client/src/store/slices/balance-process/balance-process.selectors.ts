import { Namespace } from '@client/src/const';
import { BalanceStateNamespace } from '@client/src/types/selector';
import { BalancesWithPaginationRDO } from '@shared/balance';

// Lists
export function getBalanceList(state: BalanceStateNamespace): BalancesWithPaginationRDO | null {
  return state[Namespace.BALANCE].paginatedBalance;
}

// Loading statuses
export function getBalanceListLoadingStatus(state: BalanceStateNamespace): boolean {
  return state[Namespace.BALANCE].isBalanceLoading;
}
