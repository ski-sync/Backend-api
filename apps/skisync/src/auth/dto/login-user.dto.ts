import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class LoginUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  @Exclude()
  password: string;
}
