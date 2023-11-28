import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseService } from './database/database.service';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './role/role.guard';

@Module({
  imports: [UsersModule, AuthModule, RoleModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService, { provide: APP_GUARD, useClass: RoleGuard }],
})
export class AppModule {}
