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
    return uploadDirectoryPath;
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), filename)
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const currentDateDirectory = getCurrentDayTimeDirectory();
      const uniqFilename = `${getUniqFilenamePrefix()}-${file.originalname}`;
      const filesDirectory = `${currentDateDirectory}/${uniqFilename}`;
      const filesDestination = this.getDestinationFilePath(filesDirectory);

      const uploadDirectoryPath = this.getUploadDirectoryPath();

      await ensureDir(`${uploadDirectoryPath}/${currentDateDirectory}`);
      await writeFile(filesDestination, file.buffer);

      return filesDestination;
    } catch (error) {
      this.logger.error(`Error while saving file: ${error.message}`);
      throw new Error(`Can't save file`);
    }
  }
}