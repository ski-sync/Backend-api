import { Controller } from '@nestjs/common';
import { InfluxService } from './influx.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class InfluxController {
  constructor(private readonly influxService: InfluxService) {}

  @MessagePattern('get_runs')
  getHello(): string {
    console.log('read');
    return this.influxService.readData();
  }

  @MessagePattern('write_runs')
  write(data: any): string {
    console.log('write');

    return this.influxService.writeData(data);
  }
}
