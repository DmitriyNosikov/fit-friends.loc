import { State, AppDispatch } from '../types/state';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}
