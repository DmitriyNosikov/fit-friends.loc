import { ReactElement } from 'react';
import BackBtn from '@client/src/components/back-btn/back-btn';
import useFetchOrdersList from '@client/src/hooks/useFetchOrdersList';
import OrdersSort from '../../components/orders/orders-sort/orders-sort';
import Stub from '@client/src/components/tools/stub/stub';
import OrdersList from '../../components/orders/orders-list/orders-list';

export default function Orders(): ReactElement {
  const orders = useFetchOrdersList();
  const orderEntities = orders?.entities;

  console.log('Orders: ', orders);

  return (
    <section className="my-orders">
      <div className="container">
        <div className="my-orders__wrapper">

          <BackBtn />

          {
            !orders && <Stub />
          }

          {
            orderEntities &&
            <>
              <div className="my-orders__title-wrapper">
                <h1 className="my-orders__title">Мои заказы</h1>

                <OrdersSort />
              </div>

              <OrdersList orders={ orderEntities } />

              <div className="show-more my-orders__show-more">
                <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
              </div>
            </>
          }
        </div>
      </div>
    </section>

  )
}
