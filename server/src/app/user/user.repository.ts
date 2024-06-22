import { Injectable } from '@nestjs/common';

import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { BasePostgresRepository } from '../libs/data-access';

import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';
import { UserInterface } from './interfaces';

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

    const userEntity = this.createEntityFromDocument(user as unknown as UserInterface);

    return userEntity;
  }

  public async findById(userId: string): Promise<UserEntity | null> {
    const user = await this.dbClient.user.findFirst({
      where: { id: userId }
    });

    if(!user) {
      return null;
    }

    const userEntity = this.createEntityFromDocument(user as unknown as UserInterface);

    return userEntity;
  }

  public async create(entity: UserEntity): Promise<UserEntity | null> {
    const user = await this.dbClient.user.create({
      data: entity
    });

    if(!user) {
      return null;
    }

    const newUser = this.createEntityFromDocument(user as unknown as UserInterface);

    return newUser;
  }

  public async updateById(
    userId: string,
    fieldsToUpdate: Partial<UserEntity>
  ): Promise<UserEntity | null> {
    const updatedUser = await this.dbClient.user.update({
      where: { id: userId },
      data: { ...fieldsToUpdate }
    });

    if(!updatedUser) {
      return Promise.resolve(null);
    }

    const userEntity = this.createEntityFromDocument(updatedUser as unknown as UserInterface);

    return userEntity;
  }

  public async deleteById(userId: string): Promise<void> {
    await this.dbClient.user.delete({
      where: { id: userId }
    });
  }

  public async getUserRole(userId: string): Promise<string | null> {
    const { role } = await this.dbClient.user.findFirst({
      where: { id: userId },
      select: {
        role: true
      }
    });

    if(!role) {
      return null;
    }

    return role;
  }

  public async exists(userId: string): Promise<boolean> {
    const user = await this.dbClient.user.findFirst({
      where: { id: userId }
    });

    if(!user) {
      return false;
    }

    return true;
  }
}
