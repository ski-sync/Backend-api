import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'apps/skisync/src/users/users.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import jwtConfiguration from 'lib/config/jwt.configuration';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { smtpMicroserviceOptions } from 'lib/queues/smtp.queue';
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
    ClientsModule.register([
      {
        name: 'SMTP_SERVICE',
        transport: Transport.RMQ,
        options: smtpMicroserviceOptions.options,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
