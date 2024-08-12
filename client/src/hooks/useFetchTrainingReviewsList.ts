import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchTrainingReviewsAction } from '../store/actions/api-training-review-action';
import { getTrainingReviewsList } from '../store/slices/training-reviews-process/training-process.selectors';


export default function useFetchTrainingReviewsList(trainingId: string) {
  const dispatch = useAppDispatch();
  const trainingReviews = useAppSelector(getTrainingReviewsList);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchTrainingReviewsAction(trainingId)); // Список тренировок
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return trainingReviews;
}
