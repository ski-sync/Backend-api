import { Module } from '@nestjs/common';
import { SmtpController } from './smtp.controller';
import { SmtpService } from './smtp.service';
import { ConfigModule } from '@nestjs/config';
import resendConfiguration from 'lib/config/resend.configuration';
import { Resend } from 'lib/config/resend.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [resendConfiguration],
      validationSchema: Resend,
    }),
  ],
  controllers: [SmtpController],
  providers: [SmtpService],
})
export class SmtpModule {}
