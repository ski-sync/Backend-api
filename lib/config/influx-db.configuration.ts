import { registerAs } from '@nestjs/config';

export default registerAs('influxDB', () => ({
  url: process.env.INFLUXDB_URL,
  token: process.env.INFLUXDB_TOKEN,
  org: process.env.INFLUXDB_ORG,
  orgID: process.env.INFLUXDB_ORG_ID,
  bucket: process.env.INFLUXDB_BUCKET,
}));
