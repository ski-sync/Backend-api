import { Module } from '@nestjs/common';
import { InfluxDB } from '@influxdata/influxdb-client';
import { influxDBConfig } from 'lib/config/influx-db.configuration';

@Module({
  providers: [
    // connexion à la base de données InfluxDB
    {
      provide: 'InfluxClient',
      useFactory: async () => {
        const influxDBClient = new InfluxDB(influxDBConfig);
        console.log(influxDBConfig);
        return influxDBClient;
      },
    },
  ],
  exports: ['InfluxClient'],
})
export class InfluxModule {}
