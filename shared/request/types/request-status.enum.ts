export const RequestStatusEnum = {
  PROCESSING: 'на рассмотрении',
  ACCEPTED: 'принят',
  DECLINED: 'отклонен'
} as const;

export type RequestStatus = (typeof RequestStatusEnum)[keyof typeof RequestStatusEnum];
export const requestStatusList: RequestStatus[] = ['на рассмотрении', 'принят', 'отклонен'];