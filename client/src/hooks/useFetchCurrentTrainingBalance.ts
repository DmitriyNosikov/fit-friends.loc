import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchCurrentTrainingBalance } from '../store/actions/api-balance-action';
import { getCurrentTrainingBalance } from '../store/slices/balance-process/balance-process.selectors';


export default function useFetchCurrentTrainingBalance(trainingId: string) {
  const dispatch = useAppDispatch();
  const balance = useAppSelector(getCurrentTrainingBalance);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchCurrentTrainingBalance({ trainingId })); // Баланс ntreotq тренировокb пользователя
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return balance;
}
