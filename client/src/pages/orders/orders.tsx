import { ReactElement, useState } from 'react';
import BackBtn from '@client/src/components/back-btn/back-btn';
import OrdersSort from '../../components/orders/orders-sort/orders-sort';
import OrdersList  from '../../components/orders/orders-list/orders-list';

export const OrdersSortTypeEnum = {
  TOTAL_PRICE: 'totalPrice',
  TRAININGS_COUNT: 'trainingsCount'
} as const;

export type OrdersSortTypeList = (typeof OrdersSortTypeEnum)[keyof typeof OrdersSortTypeEnum];

export type OrdersSortType = {
  type: OrdersSortTypeList,
  order: 'DESC' | 'ASC'
}

export default function Orders(): ReactElement {
  const [sort, setSort] = useState({
    type: OrdersSortTypeEnum.TOTAL_PRICE,
    order: 'DESC'
  });

  return (
    <section className="my-orders">
      <div className="container">
        <div className="my-orders__wrapper">

          <BackBtn />

          <div className="my-orders__title-wrapper">
            <h1 className="my-orders__title">Мои заказы</h1>

            <OrdersSort sort={ sort } onSortChange={ setSort }/>
          </div>

          <OrdersList sort={sort} />
        </div>
      </div>
    </section>

  )
}
