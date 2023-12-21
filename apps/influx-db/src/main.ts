import { NestFactory } from '@nestjs/core';
import { InfluxDbModule } from './influx-db.module';
import { InfluxDbMicrosericeOptions } from 'lib/queues/influxDb.queue';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(InfluxDbModule, InfluxDbMicrosericeOptions);
  await app.listen();
}
bootstrap();
