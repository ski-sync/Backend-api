import { Transport, RmqOptions } from '@nestjs/microservices';

export const InfluxDbMicrosericeOptions: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [`amqp://localhost:5672`],
    queue: 'influx_queue',
  },
};
