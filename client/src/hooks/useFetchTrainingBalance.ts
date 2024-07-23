import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchBalanceAction } from '../store/actions/api-balance-action';
import { getOrdersList } from '../store/slices/order-process/order-process.selectors';


export default function useFetchTrainingBalance() {
  const dispatch = useAppDispatch();
  const balance = useAppSelector(getOrdersList);

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
