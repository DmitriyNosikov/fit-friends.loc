import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { fetchAdditionalInfoAction } from '../store/actions/api-user-action';


export default function useAdditionalInfo() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchAdditionalInfoAction());
    }

    return () => {
      isMounted = false;
    };
  }, []);
}
