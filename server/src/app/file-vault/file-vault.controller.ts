import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileVaultService } from './file-vault.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FilesExtValidationPipe } from '@server/libs/pipes/files-ext-validation.pipe';

@ApiTags('files')
@Controller('files')
export class FileVaultController {
  constructor(
    private readonly fileVaultService: FileVaultService,
  ) { }

  @Post('/upload')
  @UsePipes(FilesExtValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const savingResult = await this.fileVaultService.saveFile(file);

    return savingResult.fileUrl;
  }

  @Post('/multiple-upload')
  @UsePipes(FilesExtValidationPipe)
  @UseInterceptors(FilesInterceptor('files'))
  public async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    const savingResult = await this.fileVaultService.saveFiles(files);

    return savingResult
  }
}