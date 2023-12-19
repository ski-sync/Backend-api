import { registerAs } from '@nestjs/config';

export default registerAs('resend', () => ({
  RESEND_TOKEN: process.env.RESEND_TOKEN,
}));
