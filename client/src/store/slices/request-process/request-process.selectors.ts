import { Namespace } from '@client/src/const';
import { RequestStateNamespace } from '@client/src/types/selector';
import { RequestsWithPaginationRDO } from '@shared/request';

// Lists
export function getUserRequestsList(state: RequestStateNamespace): RequestsWithPaginationRDO | null {
  return state[Namespace.REQUEST].paginatedRequests;
}

// Loading statuses
export function getUserRequestsListLoadingStatus(state: RequestStateNamespace): boolean {
  return state[Namespace.REQUEST].isRequestsLoading;
}
