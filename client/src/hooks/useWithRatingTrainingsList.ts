import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { fetchWithRatingTrainingsAction } from '../store/actions/api-training-action';


export default function useWithRatingTrainingsList() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchWithRatingTrainingsAction()); // Список тренировок
    }

    return () => {
      isMounted = false;
    };
  }, []);
}
