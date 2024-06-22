export const SortDirection = {
  ASC: 'asc', // По возрастанию
  DESC: 'desc' // По убыванию
} as const;

export type SortDirectionEnum = (typeof SortDirection)[keyof typeof SortDirection];
