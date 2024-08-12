import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchUserByIdAction } from '../store/actions/api-user-action';
import { getUserInfo } from '../store/slices/user-process/user-process.selectors';


export default function useFetchUserById(userId: string) {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(getUserInfo);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchUserByIdAction({ userId }));
    }

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return userInfo;
}
