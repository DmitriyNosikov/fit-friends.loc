import {  Injectable, Logger } from '@nestjs/common';
import { join } from 'node:path';

import { ConfigService } from '@nestjs/config';
import { ConfigEnvironment } from 'server/src/config';
import { ConfigEnum } from 'server/src/config/config.schema';

import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { getCurrentDayTimeDirectory, getUniqFilenamePrefix } from '@server/libs/helpers';

@Injectable()
export class FileVaultService {
  private readonly logger = new Logger(FileVaultService.name);

  constructor(
    private readonly configService: ConfigService
  ) {}

  private getUploadDirectoryPath(): string {
    const uploadDirectoryPath = this.configService.get<string>(`${ConfigEnvironment.APP}.${ConfigEnum.UPLOAD_DIRECTORY_PATH}`)
    const currentDateDirectory = getCurrentDayTimeDirectory();
    return join(uploadDirectoryPath, currentDateDirectory);
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), filename)
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();

      const uniqFilename = `${getUniqFilenamePrefix()}-${file.originalname}`;
      const filesDestination = this.getDestinationFilePath(uniqFilename);

      await ensureDir(uploadDirectoryPath);
      await writeFile(filesDestination, file.buffer);

      return filesDestination;
    } catch (error) {
      this.logger.error(`Error while saving file: ${error.message}`);
      throw new Error(`Can't save file`);
    }
  }
}