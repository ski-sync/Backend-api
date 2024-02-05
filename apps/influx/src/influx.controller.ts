import { Controller } from '@nestjs/common';
import { InfluxService } from './influx.service';
import { MessagePattern } from '@nestjs/microservices';
import { Run } from 'lib/interfaces/run.interfaces';

@Controller()
export class InfluxController {
  constructor(private readonly influxService: InfluxService) {}

  @MessagePattern('get_runs')
  getHello(data: string): any {
    console.log('read');
    return this.influxService.readRun(data);
  }

  @MessagePattern('write_runs')
  async write(data: Run): Promise<string> {
    console.log('write');

    return await this.influxService.writeRun(data);
  }
}
