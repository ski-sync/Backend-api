import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  uuid: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  deletedAt: Date;
}
