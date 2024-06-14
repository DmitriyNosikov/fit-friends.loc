import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { TokenInterface } from '@server/libs/interfaces';
import { UserRDO } from './user.rdo';


export class LoggedUserRDO extends UserRDO implements TokenInterface{
  @ApiProperty({
    description: 'User JWT Token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpFVCJ9.eyJ1c2VySWQiOiI2NjM4ZDIzZDgyNGQ3ZTdkNzQ3NzNjYmIiLCJlbWFpbCI6Imlyb24tbWFuM0BzdGFya2luZHVzdHJpZXMuaXQiLCJmaXJzdG5hbWUiOiJUb255IiwibGFzdG5hbWUiOiJTdGFyazEyMyIsImlhdCI6MTcxNTAwMDYyMCwiZXhwIjoxNzE1MDAwOTIwfQ.TgH1861ix-vw6XGtoCLfDymnH_9yQIYp0Z3m7TT3jxY'
  })
  @Expose()
  public accessToken!: string;

  @ApiProperty({
    description: 'User JWT Refresh Token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpFVCJ9.eyJ1c2VySWQiOiI2NjM4ZDIzZDgyNGQ3ZTdkNzQ3NzNjYmIiLCJlbWFpbCI6Imlyb24tbWFuM0BzdGFya2luZHVzdHJpZXMuaXQiLCJmaXJzdG5hbWUiOiJUb255IiwibGFzdG5hbWUiOiJTdGFyazEyMyIsImlhdCI6MTcxNTAwMDYyMCwiZXhwIjoxNzE1MDAwOTIwfQ.TgH1861ix-vw6XGtoCLfDymnH_9yQIYp0Z3m7TT3jxY'
  })
  @Expose()
  public refreshToken: string;
}
