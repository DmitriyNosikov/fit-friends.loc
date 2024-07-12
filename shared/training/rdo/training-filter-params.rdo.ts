import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';


export class TrainingFilterParamsRDO {
  @ApiProperty({
    description: 'Training min/max price',
    example: 'price: { \
      min: 1800;\
      max: 2900;\
    }'
  })
  @Expose()
  public price: {
    min: number;
    max: number;
  };

  @ApiProperty({
    description: 'Training min/max calories',
    example: 'price: { \
      min: 2100;\
      max: 3300;\
    }'
  })
  @Expose()
  public calories: {
    min: number;
    max: number;
  };
}