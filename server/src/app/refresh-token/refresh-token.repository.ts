import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '../libs/data-access';
import { StorableJWTTokenInterface } from '../libs/interfaces/storable-jwt-token.interface';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenFactory } from './refresh-token.factory';

@Injectable()
export class RefreshTokenRepository extends BasePostgresRepository<RefreshTokenEntity, StorableJWTTokenInterface> {
  constructor(
    entityFactory: RefreshTokenFactory,
    readonly dbClient: PrismaClientService
  ){
    super(entityFactory, dbClient);
  }

  public async findByTokenId(tokenId: string): Promise<RefreshTokenEntity | null> {
    const token = await this.dbClient.refreshToken.findFirst({
      where: { tokenId }
    })

    return this.createEntityFromDocument(token);
  }

  public async findByUserId(userId: string): Promise<RefreshTokenEntity | null> {
    const token = await this.dbClient.refreshToken.findFirst({
      where: { userId }
    })

    return this.createEntityFromDocument(token);
  }

  public async deleteByTokenId(tokenId: string): Promise<void> {
    await this.dbClient.refreshToken.deleteMany({ 
      where: { tokenId }
     });
  }

  public async deleteExpiredTokens(): Promise<void> {
    await this.dbClient.refreshToken.deleteMany({ 
      where: { 
        expiresIn: {
          lt: new Date()
        }
       }
     });

  }
}
