import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { DatabaseService } from './database/database.service';
import { ConfigModule } from '@nestjs/config';
import jwtConfiguration from './config/jwt.configuration';
import { jwtValidationSchema } from './config/jwt.validation';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    RoleModule,
    JwtModule,
    ConfigModule.forRoot({
      load: [jwtConfiguration],
      validationSchema: jwtValidationSchema,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
