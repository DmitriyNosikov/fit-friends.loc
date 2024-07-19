export const PaymentTypeEnum = {
  VISA: 'visa',
  MIR: 'мир',
  IOMONEY: 'iomoney',
} as const;

export type PaymentType = (typeof PaymentTypeEnum)[keyof typeof PaymentTypeEnum];
export const paymentTypeList: PaymentType[] = ['visa', 'мир', 'iomoney'];