import { ApiProperty } from '@nestjs/swagger';

export class DeleteRoleDto {
  @ApiProperty()
  name: string;
  deletedAt: Date;
}
