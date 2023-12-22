import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RunService {
  constructor(
    @Inject('INFLUX_SERVICE')
    private influxProxy: ClientProxy,
  ) {}

  async getRuns(): Promise<any> {
    const payload = '';
    return this.influxProxy.send('get_runs', payload);
  }

  async writeRuns(): Promise<any> {
    const payload = '';
    return this.influxProxy.send('write_runs', payload);
  }
}
