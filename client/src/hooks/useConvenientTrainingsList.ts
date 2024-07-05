import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { fetchConvenientTrainingsAction } from '../store/actions/api-training-action';


export default function useConvenientTrainingsList() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchConvenientTrainingsAction()); // Список тренировок
    }

    return () => {
      isMounted = false;
    };
  }, []);
}
