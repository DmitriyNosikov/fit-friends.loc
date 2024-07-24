import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchBalanceAction } from '../store/actions/api-balance-action';
import { getBalanceList } from '../store/slices/balance-process/balance-process.selectors';


export default function useFetchTrainingBalance() {
  const dispatch = useAppDispatch();
  const balance = useAppSelector(getBalanceList);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchBalanceAction()); // Баланс тренировок пользователя
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return balance;
}
