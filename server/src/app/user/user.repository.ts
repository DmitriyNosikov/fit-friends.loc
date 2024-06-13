import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongoDbRepository } from '../libs/data-access'

import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository extends BaseMongoDbRepository<UserEntity, UserModel> {
  constructor(
    entityFactory: UserFactory,
    @InjectModel(UserModel.name) UserModel: Model<UserModel>
  ){
    super(entityFactory, UserModel);
  }

  public async findByEmail(userEmail: string): Promise<UserEntity | null> {
    const user = await this.model.findOne({ email: userEmail }).exec();

    if(!user) {
      return Promise.resolve(null);
    }

    const userEntity = this.createEntityFromDocument(user);

    return Promise.resolve(userEntity);
  }
}
