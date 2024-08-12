import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchAdditionalInfoAction } from '../store/actions/api-user-action';
import { getAdditionalInfo } from '../store/slices/user-process/user-process.selectors';


export default function useFetchAdditionalInfo() {
  const dispatch = useAppDispatch();
  const additionalInfo = useAppSelector(getAdditionalInfo);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchAdditionalInfoAction());
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return additionalInfo;
}
