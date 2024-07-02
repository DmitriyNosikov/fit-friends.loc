import { Controller, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileVaultService } from './file-vault.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileExtValidationPipe } from '@server/libs/pipes/file-ext-validation.pipe';

@ApiTags('files')
@Controller('files')
export class FileVaultController {
  constructor(
    private readonly fileVaultService: FileVaultService,
  ) {}

  @Post('/upload')
  @UsePipes(FileExtValidationPipe)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileVaultService.saveFile(file);
  }
}