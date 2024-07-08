import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { fetchTrainingItemAction } from '../store/actions/api-training-action';


export default function useTrainingItem(trainingId: string) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchTrainingItemAction(trainingId)); // Список тренировок
    }

    return () => {
      isMounted = false;
    };
  }, []);
}
