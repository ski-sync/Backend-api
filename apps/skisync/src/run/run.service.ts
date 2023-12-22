import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RunService {
  constructor(
    @Inject('INFLUX_SERVICE')
    private readonly influxProxy: ClientProxy,
  ) {}

  async getRuns(): Promise<any> {
    const payload = '';
    return this.influxProxy.send('get_runs', payload);
  }
}
