import { Controller, Get } from '@nestjs/common';
import { InfluxDbService } from './influx-db.service';

@Controller()
export class InfluxDbController {
  constructor(private readonly influxDbService: InfluxDbService) {}

  @Get()
  getHello(): string {
    return this.influxDbService.getHello();
  }
}
