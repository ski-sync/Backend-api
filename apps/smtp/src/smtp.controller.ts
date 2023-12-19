import { Controller } from '@nestjs/common';
import { SmtpService } from './smtp.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from 'lib/interfaces/smtp.interfaces';

@Controller()
export class SmtpController {
  constructor(private readonly smtpService: SmtpService) {}

  @MessagePattern('send_email')
  sendEmail(data: User) {
    // send email
    console.log('send email', data);
    this.smtpService.sendEmail(data);
  }
}
