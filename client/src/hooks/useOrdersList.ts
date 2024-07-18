import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { fetchOrdersAction } from '../store/actions/api-order-action';
import { getOrdersList } from '../store/slices/order-process/order-process.selectors';


export default function useOrdersList() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrdersList);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      dispatch(fetchOrdersAction()); // Список заказов пользователя
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return orders;
}
