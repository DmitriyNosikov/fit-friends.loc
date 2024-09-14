import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { BaseSearchQuery } from '@shared/types';
import { UsersWithPaginationRDO } from '@shared/user';
import { getUsersList } from '../store/slices/user-process/user-process.selectors';
import { searchUsersAction } from '../store/actions/api-user-action';

export default function useSearchUsers(searchQuery: BaseSearchQuery): UsersWithPaginationRDO | null {
  const dispatch = useAppDispatch();
  const trainingsList = useAppSelector(getUsersList);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(searchUsersAction({ searchQuery }));
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return trainingsList;
}
