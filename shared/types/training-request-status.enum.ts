export const TrainingRequestStatusEnum = {
  PROCESSING: 'На рассмотрении',
  ACCEPTED: 'Принят',
  DECLINED: 'Отклонен'
} as const;

export type TrainingRequestStatus = (typeof TrainingRequestStatusEnum)[keyof typeof TrainingRequestStatusEnum];
export const trainingRequestStatusList: TrainingRequestStatus[] = ['На рассмотрении', 'Принят', 'Отклонен'];