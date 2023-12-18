import { Body, Controller, Post, Get, UseGuards, UnauthorizedException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Roles } from './roles.decorator';
import { AuthGuard } from './../auth/auth.guard';
import { RoleGuard } from './roles.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GetRoleDto } from './dto/get-role.dto';
import { DeleteRoleDto } from './dto/delete-role.dto';

@Controller('roles')
@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiCreatedResponse({ description: 'Get all roles', type: [GetRoleDto] })
  @Roles(['admin'])
  @Get('all')
  get() {
    return this.rolesService.getAll();
  }

  @ApiCreatedResponse({ description: 'Get all roles', type: CreateRoleDto })
  @Roles(['admin'])
  @Post('create')
  create(@Body() roleDto: CreateRoleDto) {
    if (roleDto.name) {
      return this.rolesService.findOne({ name: roleDto.name, deletedAt: null }).then(role => {
        if (role) {
          throw new UnauthorizedException('Role already exist');
        }
        return this.rolesService.createRole({ name: roleDto.name });
      });
    }
  }

  @ApiCreatedResponse({ description: 'Get all roles', type: DeleteRoleDto })
  @Roles(['admin'])
  @Post('delete')
  delete(@Body() dto: DeleteRoleDto) {
    if (dto.name) {
      return this.rolesService.updateRole({ where: { name: dto.name, deletedAt: null }, data: { deletedAt: new Date() } });
    }
    throw new UnauthorizedException('Name is required');
  }

  @ApiCreatedResponse({ description: 'Get all roles', type: UpdateRoleDto })
  @Roles(['admin'])
  @Post('update')
  update(@Body() dto: UpdateRoleDto) {
    if (dto.name && dto.newName) {
      return this.rolesService.findOne({ name: dto.name, deletedAt: null }).then(role => {
        if (!role) {
          throw new UnauthorizedException('Role not found');
        }

        return this.rolesService.updateRole({ where: { name: dto.name, deletedAt: null }, data: { name: dto.newName } });
      });
    }
    throw new UnauthorizedException('Name and newName is required');
  }

  @ApiCreatedResponse({ description: 'Get all roles', type: GetRoleDto })
  @Roles(['admin'])
  @Get('get')
  getRole(@Body() dto: GetRoleDto) {
    if (dto.name) {
      return this.rolesService.findOne({ name: dto.name, deletedAt: null });
    }
    throw new UnauthorizedException('Name is required');
  }
}
