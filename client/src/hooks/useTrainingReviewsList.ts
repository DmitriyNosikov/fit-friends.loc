import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { fetchTrainingReviewsAction } from '../store/actions/api-training-review-action';


export default function useTrainingReviewsList(trainingId: string) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchTrainingReviewsAction(trainingId)); // Список тренировок
    }

    return () => {
      isMounted = false;
    };
  }, []);
}
