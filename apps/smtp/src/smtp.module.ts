import { Module } from '@nestjs/common';
import { SmtpController } from './smtp.controller';
import { SmtpService } from './smtp.service';

@Module({
  imports: [],
  controllers: [SmtpController],
  providers: [SmtpService],
})
export class SmtpModule {}
