import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import jwtConfiguration from 'src/config/jwt.configuration';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      load: [jwtConfiguration],
    }),
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
