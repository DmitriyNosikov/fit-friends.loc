import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileVaultService } from './file-vault.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileExtValidationPipe } from '@server/libs/pipes/file-ext-validation.pipe';

@ApiTags('files')
@Controller('files')
export class FileVaultController {
  constructor(
    private readonly fileVaultService: FileVaultService,
  ) { }

  @Post('/upload')
  @UsePipes(FileExtValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileVaultService.saveFile(file);
  }

  @Post('/multiple-upload')
  @UsePipes(FileExtValidationPipe)
  @UseInterceptors(FileInterceptor('files'))
  public async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log('Uploading files: ', files);
  }
}