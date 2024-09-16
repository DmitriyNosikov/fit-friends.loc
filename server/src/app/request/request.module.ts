import { forwardRef, Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { RequestFactory } from './request.factory';
import { RequestRepository } from './request.repository';

import { UserModule } from '@server/user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule)
  ],
  controllers: [RequestController],
  providers: [RequestService, RequestFactory, RequestRepository],
  exports: [RequestService]
})
export class RequestModule {}