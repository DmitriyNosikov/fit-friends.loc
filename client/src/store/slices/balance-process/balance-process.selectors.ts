import { Namespace } from '@client/src/const';
import { BalanceStateNamespace } from '@client/src/types/selector';
import { BalancesWithPaginationRDO, CreateBalanceRDO } from '@shared/balance';

// Lists
export function getBalanceList(state: BalanceStateNamespace): BalancesWithPaginationRDO | null {
  return state[Namespace.BALANCE].paginatedBalance;
}

// Current training balance
export function getCurrentTrainingBalance(state: BalanceStateNamespace): CreateBalanceRDO | null {
  return state[Namespace.BALANCE].currentTrainingBalance;
}

// Loading statuses
export function getBalanceListLoadingStatus(state: BalanceStateNamespace): boolean {
  return state[Namespace.BALANCE].isBalanceLoading;
}
