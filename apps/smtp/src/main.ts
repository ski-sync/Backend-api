import { NestFactory } from '@nestjs/core';
import { SmtpModule } from './smtp.module';

async function bootstrap() {
  const app = await NestFactory.create(SmtpModule);
  await app.listen(3000);
}
bootstrap();
