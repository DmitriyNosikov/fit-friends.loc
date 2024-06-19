import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CreateTrainingRDO } from './create-training.rdo';

export class TrainingsWithPaginationRDO {
  @Expose()
  @ApiProperty({
    description: 'Product entities array',
    type: CreateTrainingRDO,
  })
  @Type(() => CreateTrainingRDO)
  public entities!: CreateTrainingRDO[];

  @Expose()
  @ApiProperty({
    description: 'Paginated item pages count',
    example: 2
  })
  public totalPages!: number;

  @Expose()
  @ApiProperty({
    description: 'Total items count',
    example: 23
  })
  public totalItems!: number;

  @Expose()
  @ApiProperty({
    description: 'Current page number in pagination',
    example: 1
  })
  public currentPage!: number;

  @Expose()
  @ApiProperty({
    description: 'items per page',
    example: 7
  })
  public itemsPerPage!: number;
}
