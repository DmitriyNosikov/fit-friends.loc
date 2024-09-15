import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { UsersWithPaginationRDO } from '@shared/user';
import { getUsersList } from '../store/slices/user-process/user-process.selectors';
import { fetchUserFriendsAction, SearchUserFriendsData } from '../store/actions/api-user-action';

export default function useFetchUserFriends(searchQuery: SearchUserFriendsData): UsersWithPaginationRDO | null {
  const dispatch = useAppDispatch();
  const trainingsList = useAppSelector(getUsersList);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchUserFriendsAction(searchQuery));
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return trainingsList;
}
