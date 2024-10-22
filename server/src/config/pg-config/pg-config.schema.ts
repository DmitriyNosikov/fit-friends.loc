import { IsString, validateOrReject, ValidationError } from 'class-validator';
import { PGConfigMessage } from './pg-config.constant';

export const PGConfigEnum = {
  PG_USER: 'postgresUser',
  PG_PASSWORD: 'postgresPassword',
  PG_DB_NAME: 'postgresDatabaseName',
  PG_PORT: 'postgresPort',

  PGADMIN_DEFAULT_EMAIL: 'postgresAdminDefaultEmail',
  PGADMIN_DEFAULT_PASSWORD: 'postgresAdminDefaultPassword',
  PGADMIN_DEFAULT_PORT: 'postgresAdminDefaultPort',
} as const;

export interface PGConfigInterface {
  [PGConfigEnum.PG_USER]: string,
  [PGConfigEnum.PG_PASSWORD]: string,
  [PGConfigEnum.PG_DB_NAME]: string,
  [PGConfigEnum.PG_PORT]: number,

  [PGConfigEnum.PGADMIN_DEFAULT_EMAIL]: string,
  [PGConfigEnum.PGADMIN_DEFAULT_PASSWORD]: string,
  [PGConfigEnum.PGADMIN_DEFAULT_PORT]: number,
};

export class PGConfigSchema implements PGConfigInterface {
  @IsString()
  postgresUser: string;

  @IsString()
  postgresPassword: string;

  @IsString()
  postgresDatabaseName: string;

  @IsString()
  postgresPort: number;


  @IsString()
  postgresAdminDefaultEmail: string;
  
  @IsString()
  postgresAdminDefaultPassword: string;

  @IsString()
  postgresAdminDefaultPort: number;

  async validate() {
    return await validateOrReject(this).catch((errors) => {
      console.log(PGConfigMessage.ERROR.VALIDATION, errors);

      throw new ValidationError();
    })
  }
}