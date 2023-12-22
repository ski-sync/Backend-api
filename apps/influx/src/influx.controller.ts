import { Controller, Get } from '@nestjs/common';
import { InfluxService } from './influx.service';

@Controller()
export class InfluxController {
  constructor(private readonly influxService: InfluxService) {}

  @Get()
  getHello(): string {
    return this.influxService.getHello();
  }
}
