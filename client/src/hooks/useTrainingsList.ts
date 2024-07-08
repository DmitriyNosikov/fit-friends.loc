import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { fetchTrainingsAction } from '../store/actions/api-training-action';


export default function useTrainingsList() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchTrainingsAction()); // Список тренировок
    }

    return () => {
      isMounted = false;
    };
  }, []);
}
