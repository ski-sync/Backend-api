import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from './roles.decorator';
import { AuthGuard } from './../auth/auth.guard';
import { RoleGuard } from './roles.guard';
import { RoleDto } from './dto/role.dto';

@Controller('roles')
@UseGuards(AuthGuard, RoleGuard)
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @HttpCode(HttpStatus.OK)
  @Roles(['admin'])
  @Post('create')
  create(@Body() roleDto: RoleDto) {
    if (roleDto.name) {
      return this.rolesService.createRole({ name: roleDto.name });
    }

    throw Error('Name is required');
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(['admin'])
  @Post('delete')
  delete(@Body() body: Record<string, any>) {
    if (body.name) {
      return this.rolesService.deleteRole(body.name);
    }
    throw Error('name is required');
  }
}
