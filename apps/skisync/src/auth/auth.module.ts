import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'apps/skisync/src/users/users.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import jwtConfiguration from 'apps/skisync/src/config/jwt.configuration';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: async (config: ConfigType<typeof jwtConfiguration>) => ({
        secret: config.secret,
        signOptions: { expiresIn: config.expiresIn },
      }),
      imports: [ConfigModule.forFeature(jwtConfiguration)],
      inject: [jwtConfiguration.KEY],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}