import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import resendConfiguration from 'lib/config/resend.configuration';
import { User } from 'lib/interfaces/smtp.interfaces';
import { Resend } from 'resend';

@Injectable()
export class SmtpService {
  constructor(
    @Inject(resendConfiguration.KEY)
    private resendConfig: ConfigType<typeof resendConfiguration>,
  ) {}

  sendEmail(user: User) {
    const resend = new Resend(this.resendConfig.RESEND_TOKEN);
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'louis.sasse@protonmail.com',
      subject: 'Welcome to Resend',
      html: `<p>Hi ${user.name} / ${user.email},</p><p>Thanks for signing up to Resend. We're excited to have you on board.</p><p>Best,</p><p>The Resend Team</p>`,
    });
  }
}
