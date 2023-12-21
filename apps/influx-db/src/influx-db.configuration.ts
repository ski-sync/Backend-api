export const influxDBConfig = {
  host: 'http://localhost:8086',
  token: process.env.DOCKER_INFLUXDB_INIT_ADMIN_TOKEN,
  org: process.env.DOCKER_INFLUXDB_INIT_ORG,
  bucket: process.env.DOCKER_INFLUXDB_INIT_BUCKET,
  // username: process.env.DOCKER_INFLUXDB_INIT_USERNAME,
  // password: process.env.DOCKER_INFLUXDB_INIT_PASSWORD,
};
