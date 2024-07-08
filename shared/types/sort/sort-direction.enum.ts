export const SortDirectionEnum = {
  ASC: 'asc', // По возрастанию
  DESC: 'desc' // По убыванию
} as const;

export type SortDirection = (typeof SortDirectionEnum)[keyof typeof SortDirectionEnum];
