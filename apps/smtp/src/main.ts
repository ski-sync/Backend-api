import { NestFactory } from '@nestjs/core';
import { SmtpModule } from './smtp.module';
import { smtpMicroserviceOptions } from 'lib/queues/smtp.queue';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(SmtpModule, smtpMicroserviceOptions);
  await app.listen();
}
bootstrap();
