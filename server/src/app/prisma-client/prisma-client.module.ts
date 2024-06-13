import { Global, Module } from '@nestjs/common';

import { PrismaClientService } from './prisma-client.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [PrismaClientService],
  exports: [PrismaClientService],
})
export class PrismaClientModule {}
