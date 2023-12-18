import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { DatabaseService } from 'apps/skisync/src/database/database.service';
import { AuthGuard } from 'apps/skisync/src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfiguration from './../config/jwt.configuration';
import { jwtValidationSchema } from './../config/jwt.validation';

@Module({
  imports: [
    JwtModule,
    ConfigModule.forRoot({
      load: [jwtConfiguration],
      validationSchema: jwtValidationSchema,
    }),
  ],
  providers: [DatabaseService, RolesService, { provide: 'authGuard', useClass: AuthGuard }],
  exports: [RolesService],
  controllers: [RolesController],
})
export class RoleModule {}
