import { Injectable } from '@nestjs/common';

import { BasePostgresRepository } from '../libs/data-access';
import { UserInterface } from '../libs/interfaces';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';

@Injectable()
export class UserRepository extends BasePostgresRepository<UserEntity, UserInterface> {
  constructor(
    entityFactory: UserFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }

  public async findByEmail(userEmail: string): Promise<UserEntity | null> {
    const user = await this.dbClient.user.findFirst({
      where: { email: userEmail }
    });

    if(!user) {
      return null;
    }

    const userEntity = this.createEntityFromDocument(user);

    return userEntity;
  }

  public async findById(userId: string): Promise<UserEntity | null> {
    const user = await this.dbClient.user.findFirst({
      where: { id: userId }
    });

    if(!user) {
      return null;
    }

    const userEntity = this.createEntityFromDocument(user);

    return userEntity;
  }

  public async updateByIdById(
    userId: string,
    fieldsToUpdate: Partial<UserInterface>
  ): Promise<UserEntity | null> {
    const updatedUser = await this.dbClient.user.update({
      where: { id: userId },
      data: { ...fieldsToUpdate }
    });

    if(!updatedUser) {
      return Promise.resolve(null);
    }

    const userEntity = this.createEntityFromDocument(updatedUser);

    return userEntity;
  }

  public async deleteById(userId: string): Promise<void> {
    await this.dbClient.user.delete({
      where: { id: userId }
    });
  }
}
