import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseService } from 'apps/skisync/src/database/database.service';
import { JwtModule } from '@nestjs/jwt';
import { RolesService } from 'apps/skisync/src/roles/roles.service';

@Module({
  imports: [JwtModule],
  providers: [DatabaseService, UserService, RolesService],
  exports: [UserService],
  controllers: [UsersController],
})
export class UsersModule {}
