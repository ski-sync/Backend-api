import { Injectable } from '@nestjs/common';
import { DatabaseService } from './../database/database.service';
import { Role, Prisma } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private prisma: DatabaseService) {}

  async role(roleWhereUniqueInput: Prisma.RoleWhereUniqueInput): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: roleWhereUniqueInput,
    });
  }
  async roles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoleWhereUniqueInput;
    where?: Prisma.RoleWhereInput;
    orderBy?: Prisma.RoleOrderByWithRelationInput;
  }): Promise<Role[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.role.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
