export const OrderTypeEnum = {
  SEASON_TICKET: 'абонемент'
} as const;

export type OrderType = (typeof OrderTypeEnum)[keyof typeof OrderTypeEnum];
export const orderTypeList: OrderType[] = ['абонемент'];