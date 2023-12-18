import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserDto {
  @ApiProperty({
    type: 'string',
    description: 'The UUID of the User',
    format: 'uuid',
    uniqueItems: true,
  })
  uuid: string;

  @ApiProperty({
    type: 'string',
    description: 'The name of the User',
    minLength: 1,
    maxLength: 255,
  })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'The email of the User',
    minLength: 1,
    maxLength: 255,
  })
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'The password of the User',
    minLength: 1,
    maxLength: 255,
  })
  @Exclude()
  password: string;

  @ApiProperty({
    type: 'string',
    description: 'The role of the User',
    enum: ['admin', 'user'],
  })
  role: string;

  @ApiProperty({
    type: 'string',
    description: 'The createdAt of the User',
    format: 'date-time',
    required: false,
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    description: 'The updatedAt of the User',
    format: 'date-time',
    required: false,
  })
  updatedAt: Date;
  @ApiProperty({
    type: 'string',
    description: 'The deletedAt of the User',
    format: 'date-time',
    required: false,
  })
  deletedAt: Date;
}
