import { IsNumber, IsOptional, IsString, Max, Min, ValidationError, validateOrReject } from 'class-validator';
import { DEFAULT_PORT, PORT } from './config.constant';

export const ConfigEnum = {
  HOST: 'host',
  PORT: 'port',
  UPLOAD_DIRECTORY_PATH: 'uploadDirectoryPath',
} as const;

export interface ConfigInterface {
  [ConfigEnum.HOST]: string;
  [ConfigEnum.PORT]: number;
  [ConfigEnum.UPLOAD_DIRECTORY_PATH]: string;
}

export class ConfigSchema implements ConfigInterface {
  @IsString()
  host: string;

  @IsNumber()
  @Max(PORT.MAX)
  @Min(PORT.MIN)
  @IsOptional()
  port: number = DEFAULT_PORT;

  @IsString()
  uploadDirectoryPath: string;

  async validate() {
    return await validateOrReject(this).catch((errors) => {
      console.log('App validation failed: ', errors);

      throw new ValidationError();
    });
  }
}
