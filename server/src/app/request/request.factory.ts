import { Injectable } from '@nestjs/common';
import { EntityFactoryInterface } from '../libs/interfaces';
import { RequestEntity } from './request.entity';
import { RequestInterface } from './interfaces/request.interface';


@Injectable()
export class RequestFactory implements EntityFactoryInterface<RequestEntity> {
  public create(entityPlainData: RequestInterface): RequestEntity {
    return new RequestEntity(entityPlainData);
  }
}
