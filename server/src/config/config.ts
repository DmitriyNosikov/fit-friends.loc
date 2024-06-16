import { ConfigType, registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { ConfigEnvironment, DEFAULT_PORT } from './config.constant';
import { ConfigInterface, ConfigSchema } from './config.schema';

type PromisifiedConfig = Promise<ConfigType<typeof getConfig>>;

async function getConfig(): Promise<ConfigInterface> {
  const port = process.env.PORT || String(DEFAULT_PORT);

  const config = plainToClass(ConfigSchema, {
    port: parseInt(port, 10),
    host: process.env.HOST,
  });

  await config.validate();

  return config;
}

export default registerAs(ConfigEnvironment.APP, async (): PromisifiedConfig => {
  return getConfig();
});
