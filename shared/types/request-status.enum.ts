export const RequestStatusEnum = {
  PROCESSING: 'На рассмотрении',
  ACCEPTED: 'Принят',
  DECLINED: 'Отклонен'
} as const;

export type RequestStatus = (typeof RequestStatusEnum)[keyof typeof RequestStatusEnum];
export const requestStatusList: RequestStatus[] = ['На рассмотрении', 'Принят', 'Отклонен'];