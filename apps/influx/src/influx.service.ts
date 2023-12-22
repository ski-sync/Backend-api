import { Inject, Injectable } from '@nestjs/common';
import { InfluxDB, Point } from '@influxdata/influxdb-client';

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

  writeData(): string {
    const writer = this.influxDB.getWriteApi('skiSync', 'RunData');
    const point = new Point('run').floatField('temperature', 23.43).stringField('uuid', 'fesfsf-grdhiod-4634grdgrd');
    writer.writePoint(point);
    try {
      writer
        .close()
        .then(() => {
          console.log('WRITE FINISHED');
        })
        .catch(e => {
          console.error(e);
          console.log('\\n WRITE ERROR');
        });
      return 'Write Data';
    } catch (e) {
      console.error(e);
      return 'Write Data Error';
    }
  }
}
