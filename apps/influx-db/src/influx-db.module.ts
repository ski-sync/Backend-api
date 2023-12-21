import { Module } from '@nestjs/common';
import { InfluxDB } from 'influx';
import { influxDBConfig } from './influx-db.configuration';

@Module({
  providers: [
    // connexion à la base de données InfluxDB
    {
      provide: 'InfluxDBClient',
      useFactory: async () => {
        const influxDBClient = new InfluxDB(influxDBConfig);
        return influxDBClient;
      },
    },
  ],
  exports: ['InfluxDBClient'],
})
export class InfluxDbModule {}
