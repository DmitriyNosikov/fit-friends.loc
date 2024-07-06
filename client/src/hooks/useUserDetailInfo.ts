import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { fetchUserDetailInfoAction } from '../store/actions/api-user-action';


export default function useUserDetailInfo() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchUserDetailInfoAction());
    }

    return () => {
      isMounted = false;
    };
  }, []);
}
