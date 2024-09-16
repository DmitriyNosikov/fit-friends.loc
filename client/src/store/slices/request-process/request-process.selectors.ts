import { Namespace } from '@client/src/const';
import { RequestStateNamespace } from '@client/src/types/selector';
import { CreateRequestRDO, RequestsWithPaginationRDO } from '@shared/request';

// Lists
export function getUserRequestsList(state: RequestStateNamespace): CreateRequestRDO[] | null {
  return state[Namespace.REQUEST].allUserRequests;
}

export function getTargetRequestsList(state: RequestStateNamespace): RequestsWithPaginationRDO | null {
  return state[Namespace.REQUEST].paginatedTargetRequests;
}

// Loading statuses
export function getUserRequestsListLoadingStatus(state: RequestStateNamespace): boolean {
  return state[Namespace.REQUEST].isRequestsLoading;
}
