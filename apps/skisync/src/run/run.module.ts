import { Module } from '@nestjs/common';
import { RunController } from './run.controller';
import { RunService } from './run.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InfluxDbMicrosericeOptions } from 'lib/queues/influxDb.queue';
import { AuthGuard } from 'apps/skisync/src/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfiguration from 'lib/config/jwt.configuration';
import { jwtValidationSchema } from 'lib/config/jwt.validation';
import { RolesService } from '../roles/roles.service';
import { DatabaseService } from '../database/database.service';

@Module({
  imports: [
    JwtModule,
    ClientsModule.register([
      {
        name: 'INFLUX_SERVICE',
        transport: Transport.RMQ,
        options: InfluxDbMicrosericeOptions.options,
      },
    ]),
    ConfigModule.forRoot({
      load: [jwtConfiguration],
      validationSchema: jwtValidationSchema,
    }),
  ],
  controllers: [RunController],
  providers: [RunService, DatabaseService, RolesService, { provide: 'authGuard', useClass: AuthGuard }],
})
export class RunModule {}
