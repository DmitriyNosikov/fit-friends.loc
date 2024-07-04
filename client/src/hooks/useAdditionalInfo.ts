import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { getAdditionalInfoAction } from '../store/actions/api-user-action';


export default function useAdditionalInfo() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(getAdditionalInfoAction());
    }
    return () => {
      isMounted = false;
    };
  }, []);
}
