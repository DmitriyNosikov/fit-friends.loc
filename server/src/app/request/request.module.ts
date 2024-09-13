import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { RequestFactory } from './request.factory';
import { RequestRepository } from './request.repository';

@Module({
  imports: [],
  controllers: [RequestController],
  providers: [RequestService, RequestFactory, RequestRepository],
  exports: [RequestService]
})
export class RequestModule {}