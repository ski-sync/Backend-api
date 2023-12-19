import * as Joi from 'joi';

export const Resend = Joi.object({
  RESEND_TOKEN: Joi.string().required(),
});
