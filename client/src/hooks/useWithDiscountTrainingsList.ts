import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchWithDiscountTrainingsAction } from '../store/actions/api-training-action';
import { getTrainingsWithDiscount } from '../store/slices/training-process/training-process.selectors';


export default function useWithDiscountTrainingsList() {
  const dispatch = useAppDispatch();
  const trainingsWithDiscount = useAppSelector(getTrainingsWithDiscount)

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchWithDiscountTrainingsAction()); // Список тренировок
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return trainingsWithDiscount;
}
