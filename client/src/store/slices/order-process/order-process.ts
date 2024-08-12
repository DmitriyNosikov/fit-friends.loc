import { Namespace } from '@client/src/const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateOrderRDO, OrdersWithPaginationRDO } from '@shared/order';

export type OrderProcess = {
  paginatedOrders: OrdersWithPaginationRDO | null,

  isOrdersLoading: boolean
}

const initialState: OrderProcess = {
  paginatedOrders: null,

  isOrdersLoading: false
}

export const orderProcess = createSlice({
  name: Namespace.ORDER,
  initialState,
  reducers: {
    setOrdersAction: (state, action: PayloadAction<OrdersWithPaginationRDO | null>) => {
      state.paginatedOrders = action.payload;
    },

    // Добавление заказов при нажатии а кнопку "Показать еще"
    appendOrdersAction: (state, action: PayloadAction<OrdersWithPaginationRDO | null>) => {
      const addingOrders = action.payload;

      if(!state.paginatedOrders || !addingOrders) {
        return;
      }

      addingOrders?.entities.forEach((item) => state.paginatedOrders?.entities.push(item));
      state.paginatedOrders.currentPage = addingOrders.currentPage; // Обновляем текущую страницу
    },

    updateOrdersAction: (state, action: PayloadAction<CreateOrderRDO>) => {
      const updatedOrder = action.payload;

      if(!state.paginatedOrders) {
        return;
      }

      state.paginatedOrders.entities
        .map((order) => (order.id === updatedOrder.id)
          ? updatedOrder
          : order)
    }
  },

  extraReducers(builder) {}
});


export const {
  setOrdersAction,
  appendOrdersAction,
  updateOrdersAction
} = orderProcess.actions;
