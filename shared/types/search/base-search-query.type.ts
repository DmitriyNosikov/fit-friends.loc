import { Expose, Transform } from 'class-transformer';
import { IsDateString, IsIn, IsNumber, IsOptional, Max } from 'class-validator';
import { SortType, SortTypeEnum } from '../sort/sort-type.enum';
import { SortDirection, SortDirectionEnum } from '../sort/sort-direction.enum';

export const DefaultSearchParam = {
  MAX_ITEMS_PER_PAGE: 50,
  PAGE: 1,
  SORT: {
    TYPE: SortTypeEnum.CREATED_AT,
    DIRECTION: SortDirectionEnum.DESC
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
  @IsIn(Object.values(SortTypeEnum))
  @IsOptional()
  public sortType?: SortType = DefaultSearchParam.SORT.TYPE;

  @Expose()
  @IsIn(Object.values(SortDirectionEnum))
  @IsOptional()
  public sortDirection?: SortDirection = DefaultSearchParam.SORT.DIRECTION;

  @Expose()
  @Transform(({ value }) => Number(value) || DefaultSearchParam.PAGE)
  @IsOptional()
  public page?: number = DefaultSearchParam.PAGE;
};
