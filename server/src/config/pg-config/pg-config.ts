
import { ConfigType, registerAs } from '@nestjs/config';
import { PGConfigInterface, PGConfigSchema } from './pg-config.schema';
import { plainToClass } from 'class-transformer';
import { ConfigEnvironment } from '../config.constant';

type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

async function getConfig(): Promise<PGConfigInterface> {
  const config = plainToClass(PGConfigSchema, {
    postgresUser: process.env.POSTGRES_USER,
    postgresPassword: process.env.POSTGRES_PASSWORD,
    postgresDatabaseName: process.env.POSTGRES_DB_NAME,
    postgresPort: process.env.POSTGRES_PORT,

    postgresAdminDefaultEmail: process.env.PGADMIN_DEFAULT_EMAIL,
    postgresAdminDefaultPassword: process.env.PGADMIN_DEFAULT_PASSWORD,
    postgresAdminDefaultPort: process.env.PGADMIN_DEFAULT_PORT,
  });

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.PG, async (): PromisifiedConfig => {
  return getConfig();
})