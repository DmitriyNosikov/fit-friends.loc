import { Expose, Transform } from 'class-transformer';
import { IsDateString, IsIn, IsNumber, IsOptional, Max } from 'class-validator';
import { SortType, SortTypeEnum } from '../sort/sort-type.enum';
import { SortDirection, SortDirectionEnum } from '../sort/sort-direction.enum';

export const DefaultSearchParam = {
  MAX_ITEMS_PER_PAGE: 50,
  PAGE: 1,
  SORT: {
    TYPE: SortType.CREATED_AT,
    DIRECTION: SortDirection.DESC
  }
} as const;

export class BaseSearchQuery {
  @Expose()
  @IsDateString()
  @IsOptional()
  public createdAt?: Date;

  @Expose()
  @Transform(({ value }) => Number(value) || DefaultSearchParam.MAX_ITEMS_PER_PAGE)
  @Max(DefaultSearchParam.MAX_ITEMS_PER_PAGE)
  @IsNumber()
  @IsOptional()
  public limit?: number = DefaultSearchParam.MAX_ITEMS_PER_PAGE;

  @Expose()
  @IsIn(Object.values(SortType))
  @IsOptional()
  public sortType?: SortTypeEnum = DefaultSearchParam.SORT.TYPE;

  @Expose()
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirectionEnum = DefaultSearchParam.SORT.DIRECTION;

  @Expose()
  @Transform(({ value }) => Number(value) || DefaultSearchParam.PAGE)
  @IsOptional()
  public page?: number = DefaultSearchParam.PAGE;
};
