import { CreateOrderRDO } from '@shared/order'
import OrdersListItem from '../orders-list-item/orders-list-item'

type OrdersListProps = {
  orders: CreateOrderRDO[]
}

export default function OrdersList({ orders }: OrdersListProps) {
  return (
    <ul className="my-orders__list">
      {
        orders && orders.map((order) => <OrdersListItem order={order} key={order.id}/>)
      }
    </ul>
  )
}
