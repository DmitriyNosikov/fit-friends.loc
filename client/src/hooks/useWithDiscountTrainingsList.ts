import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { fetchWithDiscountTrainingsAction } from '../store/actions/api-training-action';


export default function useWithDiscountTrainingsList() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchWithDiscountTrainingsAction()); // Список тренировок
    }

    return () => {
      isMounted = false;
    };
  }, []);
}
