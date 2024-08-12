import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { searchOrdersAction } from '../store/actions/api-order-action';
import { getOrdersList } from '../store/slices/order-process/order-process.selectors';
import { OrderSearchQuery } from '@shared/order';


export default function useSearchOrders(searchQuery: OrderSearchQuery) {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrdersList);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(searchOrdersAction({ searchQuery })); // Список заказов пользователя
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return orders;
}
