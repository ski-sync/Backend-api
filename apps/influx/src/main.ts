import { NestFactory } from '@nestjs/core';
import { InfluxModule } from './influx.module';
import { InfluxDbMicrosericeOptions } from 'lib/queues/influxDb.queue';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(InfluxModule, InfluxDbMicrosericeOptions);
  await app.listen();
}
bootstrap();
