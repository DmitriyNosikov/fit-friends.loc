import { ReactElement, useState } from 'react';
import BackBtn from '@client/src/components/back-btn/back-btn';
import OrdersSort from '../../components/orders/orders-sort/orders-sort';
import OrdersList, { OrdersSortTypeEnum } from '../../components/orders/orders-list/orders-list';

export default function Orders(): ReactElement {
  const [sortType, setSortType] = useState(OrdersSortTypeEnum.TOTAL_PRICE);

  return (
    <section className="my-orders">
      <div className="container">
        <div className="my-orders__wrapper">

          <BackBtn />

          <div className="my-orders__title-wrapper">
            <h1 className="my-orders__title">Мои заказы</h1>

            <OrdersSort onSortChange={setSortType}/>
          </div>

          <OrdersList sortBy={sortType} />
        </div>
      </div>
    </section>

  )
}
