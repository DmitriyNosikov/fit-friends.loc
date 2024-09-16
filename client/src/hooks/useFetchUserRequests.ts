import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchAllCurrentUserRequests, FetchAllUserRequestsPayload } from '../store/actions/api-request-action';
import { getUserRequestsList } from '../store/slices/request-process/request-process.selectors';

export default function useFetchCurrentUserRequests(payload?: FetchAllUserRequestsPayload) {
  const dispatch = useAppDispatch();
  const requests = useAppSelector(getUserRequestsList);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchAllCurrentUserRequests(payload)); // Список запросов
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return requests;
}
