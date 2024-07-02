import { Module } from '@nestjs/common';
import { FileVaultController } from './file-vault.controller';
import { FileVaultService } from './file-vault.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import { ConfigEnvironment } from 'server/src/config';
import { ConfigEnum } from 'server/src/config/config.schema';

@Module({
  imports: [
    // Подключаем модуль для раздачи статики
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>(`${ConfigEnvironment.APP}.${ConfigEnum.UPLOAD_DIRECTORY_PATH}`);
        return [{
          rootPath,
          serveRoot: configService.get<string>(`${ConfigEnvironment.APP}.${ConfigEnum.STATIC_SERVE_ROOT}`),
          serveStaticOptions: {
            fallthrough: true,
            etag: true,
          }
        }]
      }
    })
  ],
  controllers: [FileVaultController],
  providers: [FileVaultService],
  exports: [FileVaultService]
})
export class FileVaultModule {}