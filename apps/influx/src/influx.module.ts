import { Module } from '@nestjs/common';
import { InfluxDB } from '@influxdata/influxdb-client';
import { influxDBConfig } from 'lib/config/influx-db.configuration';
import { InfluxController } from './influx.controller';
import { InfluxService } from './influx.service';

@Module({
  providers: [
    // connexion à la base de données InfluxDB
    {
      provide: 'InfluxClient',
      useFactory: async () => {
        const influxDBClient = new InfluxDB(influxDBConfig);
        return influxDBClient;
      },
    },
    InfluxService,
  ],

  controllers: [InfluxController],

  exports: ['InfluxClient'],
})
export class InfluxModule {}
