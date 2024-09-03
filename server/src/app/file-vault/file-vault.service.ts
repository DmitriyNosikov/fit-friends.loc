import { Injectable, Logger } from '@nestjs/common';
import { join } from 'node:path';

import { ConfigService } from '@nestjs/config';
import { ConfigEnvironment } from 'server/src/config';
import { ConfigEnum } from 'server/src/config/config.schema';

import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { getCurrentDayTimeDirectory, getUniqFilenamePrefix } from '@server/libs/helpers';

type SavingFileResult = {
  fileUrl: string,
  error?: string
}

@Injectable()
export class FileVaultService {
  private readonly logger = new Logger(FileVaultService.name);

  constructor(
    private readonly configService: ConfigService
  ) {}

  public async saveFile(file: Express.Multer.File, throwError: boolean = true): Promise<SavingFileResult> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();

      const uniqFilename = `${getUniqFilenamePrefix()}-${file.originalname}`;
      const filesDestination = this.getDestinationFilePath(uniqFilename); // Место хранения файла на сервере
      const staticUrl = this.getStaticUrl(uniqFilename); // Ссылка на файл для внешних ресурсов (статика)

      await ensureDir(uploadDirectoryPath);
      await writeFile(filesDestination, file.buffer);

      const savingResult: SavingFileResult = { fileUrl: staticUrl }

      return savingResult;
    } catch (error) {
      this.logger.error(`Error while saving file: ${error.message}`);

      const savingResult: SavingFileResult = { 
        fileUrl: '',
        error: `Can't save file ${file.originalname}. Error: ${error.message}`
       }

      if(!throwError) {
        return savingResult;
      }

      throw new Error(savingResult.error);
    }
  }

  public async saveFiles(files: Array<Express.Multer.File>): Promise<string[]> {
    const uploadedFileURLs = [];

    for(const file of files) {
      const savingResult = await this.saveFile(file);

      if(savingResult.error) {
        this.logger.error(savingResult.error);
      } else {
        uploadedFileURLs.push(savingResult.fileUrl);
      }
    }

    return uploadedFileURLs;
  }

  private getStaticUrl(filename: string) {
    const staticDirectory = this.configService.get<string>(`${ConfigEnvironment.APP}.${ConfigEnum.STATIC_SERVE_ROOT}`);
    const staticUrl = join(staticDirectory, getCurrentDayTimeDirectory(), filename);

    return staticUrl;
  }

  private getUploadDirectoryPath(): string {
    const uploadDirectoryPath = this.configService.get<string>(`${ConfigEnvironment.APP}.${ConfigEnum.UPLOAD_DIRECTORY_PATH}`);
    const currentDateDirectory = getCurrentDayTimeDirectory();
    return join(uploadDirectoryPath, currentDateDirectory);
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), filename)
  }
}