import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchConvenientTrainingsAction } from '../store/actions/api-training-action';
import { getUserConvenientTrainings } from '../store/slices/training-process/training-process.selectors';


export default function useFetchConvenientTrainingsList() {
  const dispatch = useAppDispatch();
  const convenientTrainings = useAppSelector(getUserConvenientTrainings);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchConvenientTrainingsAction()); // Список тренировок
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return convenientTrainings;
}
