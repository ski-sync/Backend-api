import * as Joi from 'joi';

export const databaseValidationSchema = Joi.object({
  database_url: Joi.string().required(),
  DOCKER_INFLUXDB_INIT_USERNAME: Joi.string().required(),
  DOCKER_INFLUXDB_INIT_PASSWORD: Joi.string().required(),
  DOCKER_INFLUXDB_INIT_ORG: Joi.string().required(),
  DOCKER_INFLUXDB_INIT_BUCKET: Joi.string().required(),
});
