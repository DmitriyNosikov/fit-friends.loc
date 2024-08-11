import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchTrainingItemAction } from '../store/actions/api-training-action';
import { getTrainingItem } from '../store/slices/training-process/training-process.selectors';

export default function useFetchTrainingItem(trainingId: string) {
  const dispatch = useAppDispatch();
  const trainingItem = useAppSelector(getTrainingItem);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchTrainingItemAction({ trainingId })); // Детальная информация о тренировке
    }

    return () => {
      isMounted = false;
    };
  }, [trainingId]);

  return trainingItem;
}
