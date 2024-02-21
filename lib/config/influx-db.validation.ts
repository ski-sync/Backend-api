import * as Joi from 'joi';

export const influxDBValidationSchema = Joi.object({
    url: Joi.string().required(),
    token: Joi.string().required(),
    org: Joi.string().required(),
    orgID: Joi.string().required(),
    bucket: Joi.string().required(),
});