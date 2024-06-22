export const PaymentTypeEnum = {
  VISA: 'visa',
  MIR: 'mir',
  UMONEY: 'umoney',
} as const;

export type PaymentType = (typeof PaymentTypeEnum)[keyof typeof PaymentTypeEnum];
export const paymentTypeList: PaymentType[] = ['visa', 'mir', 'umoney'];