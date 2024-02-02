import { Injectable, Inject } from '@nestjs/common';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
// Ensure you import the correct classes/modules for organization and bucket management
import { BucketsAPI } from '@influxdata/influxdb-client-apis';
import { influxDBConfig } from 'lib/config/influx-db.configuration';
import { Run } from 'lib/interfaces/run.interfaces';


@Injectable()
export class InfluxService {
  @Inject('InfluxClient') private readonly influxDB: InfluxDB;

  readData(): string {
    const reader = this.influxDB.getQueryApi('skiSync');
    const query = 'from(bucket:"RunData") |> range(start: -1d)';
    reader.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        console.log(o);
      },
      error(error) {
        console.error(error);
        console.log('\\nFinished ERROR');
      },
      complete() {
        console.log('\\nFinished SUCCESS');
      },
    });
    return 'Read Data';
  }

  // run is json and geojson format to save in influxdb each element of array is timed
  async writeRun(run: Run): Promise<string> {

    const bucketsAPI = new BucketsAPI(this.influxDB);

    // Use postBuckets method to create a new bucket
    try {
        const bucket = await bucketsAPI.postBuckets({
            body: {
                orgID: influxDBConfig.orgID,
                name: run.userId + '-' + run.runId,
                retentionRules: [
                  {
                    type: 'expire',
                    everySeconds: 0,
                  },
                ], // You can specify retention rules here
            },
        });
        console.log('Bucket created:', bucket);
    } catch (error) {
        console.error('Error creating bucket:', error);
        return 'Error creating bucket';
    }



    // Proceed with writing points to the newly created bucket
    const writer = this.influxDB.getWriteApi('skiSync', run.userId + '-' + run.runId, 'ms');
    run.points.forEach(point => {
        const p = new Point('run')
            .floatField('humidity', point.humidity)
            .floatField('temperature', point.temperature)
            .floatField('pressure', point.pressure)
            .floatField('altitude', point.altitude)
            .floatField('latitude', point.latitude)
            .floatField('longitude', point.longitude)
            .timestamp(new Date(point.timestamp));
        writer.writePoint(p);
    });

    try {
        await writer.close();
        console.log('WRITE FINISHED');
        return 'Write Data';
    } catch (e) {
        console.error('Error writing data:', e);
        return 'Write Data Error';
    }
  }

  async readRun(bucket_id: string): Promise<any> {
    const queryApi = this.influxDB.getQueryApi('skiSync');
    const query = `from(bucket: "${bucket_id}") |> range(start: -1d)`;
    return  queryApi.collectRows(query);
  }
}
