import { Controller } from '@nestjs/common';
import { InfluxService } from './influx.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class InfluxController {
  constructor(private readonly influxService: InfluxService) {}

  @MessagePattern('get_runs')
  getHello(): string {
    return this.influxService.getHello();
  }
}
