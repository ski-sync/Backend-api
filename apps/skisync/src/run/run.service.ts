import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Run } from 'lib/interfaces/run.interfaces';

@Injectable()
export class RunService {
  constructor(
    @Inject('INFLUX_SERVICE')
    private influxProxy: ClientProxy,
  ) {}

  async getRuns(bucket_id: string): Promise<any> {
    return this.influxProxy.send('get_runs', bucket_id);
  }

  async writeRuns(data: Run): Promise<any> {
    return this.influxProxy.send('write_runs', data);
  }
}
