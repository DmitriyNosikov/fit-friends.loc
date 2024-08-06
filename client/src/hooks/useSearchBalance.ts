import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { getBalanceList } from '../store/slices/balance-process/balance-process.selectors';
import { BaseSearchQuery } from '@shared/types';
import { searchBalanceAction } from '../store/actions/api-balance-action';



export default function useSearchBalance(searchQuery: BaseSearchQuery) {
  const dispatch = useAppDispatch();
  const balance = useAppSelector(getBalanceList);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(searchBalanceAction({ searchQuery })); // Список заказов пользователя
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return balance;
}
