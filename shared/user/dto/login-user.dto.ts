import { ApiProperty } from '@nestjs/swagger';
import { UserValidation } from '@server/user/user.constant';
import { IsString, MaxLength, MinLength } from 'class-validator';
export class LoginUserDTO {
  @ApiProperty({
    description: 'User email',
    example: 'iron-man@starkindustries.it',
  })
  @IsString()
  email!: string;

  @ApiProperty({
    description: 'User password',
    example: 'jarvis-iron-hearth123',
    minimum: UserValidation.PASSWORD.MAX_LENGTH,
    maximum: UserValidation.PASSWORD.MIN_LENGTH,
  })
  @MaxLength(UserValidation.PASSWORD.MAX_LENGTH)
  @MinLength(UserValidation.PASSWORD.MIN_LENGTH)
  @IsString()
  password!: string;
}
