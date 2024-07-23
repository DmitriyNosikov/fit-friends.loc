import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchTrainingFilterParams } from '../store/actions/api-training-action';
import { TrainingFilterParamsRDO } from '@shared/training';
import { getTrainingFilterParams } from '../store/slices/training-process/training-process.selectors';


export default function useFetchTrainingFilterParams(): TrainingFilterParamsRDO | null {
  const dispatch = useAppDispatch();
  const filterParams = useAppSelector(getTrainingFilterParams);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchTrainingFilterParams());
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return filterParams;
}
