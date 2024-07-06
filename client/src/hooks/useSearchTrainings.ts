import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { searchTrainings } from '../store/actions/api-training-action';
import { TrainingSearchQuery } from '@shared/training';


export default function useSearchTrainings(searchQuery: TrainingSearchQuery) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(searchTrainings({ searchQuery })); // Список тренировок
    }

    return () => {
      isMounted = false;
    };
  }, []);
}
