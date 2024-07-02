import { Module } from '@nestjs/common';
import { FileVaultController } from './file-vault.controller';
import { FileVaultService } from './file-vault.service';

@Module({
  imports: [],
  controllers: [FileVaultController],
  providers: [FileVaultService],
  exports: [FileVaultService]
})
export class FileVaultModule {}