import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from './roles.decorator';
import { RolesService } from './roles.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private rolesService: RolesService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles_name = this.reflector.get(Roles, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!roles_name) {
      return true;
    }

    const rolesUuid = await this.rolesService.roles({ where: { name: { in: roles_name } } }).then(roles => roles.map(role => role.uuid));
    const hasRole = rolesUuid.includes(user.role);

    return hasRole;
  }
}
