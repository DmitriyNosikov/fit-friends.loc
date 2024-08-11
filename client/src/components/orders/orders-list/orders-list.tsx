import { CreateOrderRDO, OrderSearchQuery } from '@shared/order'

import { ITEMS_PER_PAGE } from '@client/src/const';

import Stub from '../../tools/stub/stub';
import OrdersListItem from '../orders-list-item/orders-list-item'

import useSearchOrders from '@client/src/hooks/useSearchOrders';
import { useAppDispatch, useAppSelector } from '@client/src/hooks';
import { searchOrdersAction } from '@client/src/store/actions/api-order-action';
import { getUserInfo } from '@client/src/store/slices/user-process/user-process.selectors';

import { OrdersSortType, OrdersSortTypeEnum } from '@client/src/pages/orders/orders';

type OrdersListProps = {
  sort: OrdersSortType
}

const START_PAGE = 1;

export default function OrdersList({ sort }: OrdersListProps) {
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

  const sortType = {
    [`${OrdersSortTypeEnum.TOTAL_PRICE}_DESC`]: (items: CreateOrderRDO[]) =>
      [...items].sort((a, b) => b.totalPrice - a.totalPrice),
    [`${OrdersSortTypeEnum.TOTAL_PRICE}_ASC`]: (items: CreateOrderRDO[]) =>
      [...items].sort((a, b) => a.totalPrice - b.totalPrice),
    [`${OrdersSortTypeEnum.TRAININGS_COUNT}_DESC`]: (items: CreateOrderRDO[]) =>
      [...items].sort((a, b) => b.trainingsCount - a.trainingsCount),
    [`${OrdersSortTypeEnum.TRAININGS_COUNT}_ASC`]: (items: CreateOrderRDO[]) =>
      [...items].sort((a, b) => a.trainingsCount - b.trainingsCount),
  };

  const sortedOrders = sortType[`${sort.type}_${sort.order}`](orderEntities);

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
