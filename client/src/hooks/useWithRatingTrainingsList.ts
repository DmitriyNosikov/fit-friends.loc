import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchWithRatingTrainingsAction } from '../store/actions/api-training-action';
import { getTrainingsWithRating } from '../store/slices/training-process/training-process.selectors';


export default function useWithRatingTrainingsList() {
  const dispatch = useAppDispatch();
  const trainingsWithRating = useAppSelector(getTrainingsWithRating);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchWithRatingTrainingsAction()); // Список тренировок
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return trainingsWithRating;
}
