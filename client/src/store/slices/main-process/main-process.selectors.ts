import { Namespace } from '@client/src/const';
import { MainStateNamespace } from '@client/src/types/selector';

export function getDataLoadingStatus(state: MainStateNamespace): boolean {
  return state[Namespace.MAIN].isDataLoading;
}
