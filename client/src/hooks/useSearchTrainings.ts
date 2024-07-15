import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { searchTrainingsAction } from '../store/actions/api-training-action';
import { TrainingSearchQuery, TrainingsWithPaginationRDO } from '@shared/training';
import { getTrainingsList } from '../store/slices/training-process/training-process.selectors';


export default function useSearchTrainings(searchQuery: TrainingSearchQuery): TrainingsWithPaginationRDO | null {
  const dispatch = useAppDispatch();
  const trainingsList = useAppSelector(getTrainingsList);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(searchTrainingsAction({ searchQuery }));
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return trainingsList;
}
