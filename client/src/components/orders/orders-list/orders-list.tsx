import { CreateOrderRDO, OrderSearchQuery } from '@shared/order'

import { ITEMS_PER_PAGE } from '@client/src/const';

import Stub from '../../tools/stub/stub';
import OrdersListItem from '../orders-list-item/orders-list-item'

import useSearchOrders from '@client/src/hooks/useSearchOrders';
import { useAppDispatch, useAppSelector } from '@client/src/hooks';
import { searchOrdersAction } from '@client/src/store/actions/api-order-action';
import { getUserInfo } from '@client/src/store/slices/user-process/user-process.selectors';

export const OrdersSortTypeEnum = {
  TOTAL_PRICE: 'totalPrice',
  TRAININGS_COUNT: 'trainingsCount'
} as const;

export type OrdersSortTypeList = (typeof OrdersSortTypeEnum)[keyof typeof OrdersSortTypeEnum];

type OrdersListProps = {
  sortBy: OrdersSortTypeList
}

const START_PAGE = 1;

export default function OrdersList({ sortBy }: OrdersListProps) {
  const userInfo = useAppSelector(getUserInfo);

  let searchQuery: OrderSearchQuery = {
    page: START_PAGE,
    limit: ITEMS_PER_PAGE,
    trainerId: userInfo?.id
  };

  const dispatch = useAppDispatch();
  const orders = useSearchOrders(searchQuery);
  const orderEntities = orders?.entities;

  if (!orderEntities) {
    return <Stub />
  }

  const isShowMoreBtnVisible = orders?.totalPages
    && orders?.totalPages > START_PAGE
    && orders.currentPage !== orders?.totalPages;

  function handleShowMoreBtnClick() {
    if (!orders || !orders.currentPage) {
      return;
    };

    let currentPage = orders.currentPage;

    searchQuery = {
      page: ++currentPage,
      limit: ITEMS_PER_PAGE
    };

    dispatch(searchOrdersAction({ searchQuery, appendItems: true }));
  }

  function handleBackToBeginBtnClick() {
    searchQuery = {
      page: START_PAGE,
      limit: ITEMS_PER_PAGE
    };

    dispatch(searchOrdersAction({ searchQuery }));
  }

  const sort = {
    [OrdersSortTypeEnum.TOTAL_PRICE]: (items: CreateOrderRDO[]) =>
      [...items].sort((a, b) => b.totalPrice - a.totalPrice),
    [OrdersSortTypeEnum.TRAININGS_COUNT]: (items: CreateOrderRDO[]) =>
      [...items].sort((a, b) => b.trainingsCount - a.trainingsCount),
  };

  const sortedOrders = sort[sortBy](orderEntities);

  return (
    <>
      <ul className="my-orders__list">
        {
          sortedOrders && sortedOrders.map((order) => <OrdersListItem order={order} key={order.id} />)
        }
      </ul>

      <div className="show-more my-orders__show-more">
        {
          isShowMoreBtnVisible &&
          <button className="btn show-more__button show-more__button--more" type="button" onClick={handleShowMoreBtnClick}>Показать еще</button>
        }

        {
          orderEntities.length > ITEMS_PER_PAGE &&
          <button className="btn show-more__button show-more__button--to-top" type="button" onClick={handleBackToBeginBtnClick}>Вернуться в начало</button>
        }
      </div>
    </>
  )
}
