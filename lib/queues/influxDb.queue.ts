import { Transport } from '@nestjs/microservices';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';

export const InfluxDbMicrosericeOptions: MicroserviceOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [`amqp://localhost:5672`],
    queue: 'influx_queue',
  },
};
