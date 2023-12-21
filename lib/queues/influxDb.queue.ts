import { Transport } from '@nestjs/microservices';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';

export const InfluxDbMicrosericeOptions: MicroserviceOptions = {
  transport: Transport.RMQ,
  options: {
    urls: ['localhost:8877'],
    queue: 'influxDb_queue',
  },
};
