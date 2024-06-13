import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import dayjs from 'dayjs';

import { parseTime } from '@project/shared/helpers';
import { userJWTConfig } from '@project/user/user-config'

import { RefreshTokenPayloadInterface } from '@project/shared/core';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenRepository } from './refresh-token.repository';


@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject (userJWTConfig.KEY) private readonly jwtOptions: ConfigType<typeof userJWTConfig>,
  ) {}

  public async createRefreshSession(payload: RefreshTokenPayloadInterface) {
    const expiresInTime = parseTime(this.jwtOptions.refreshTokenExpiresIn);

    const refreshToken = new RefreshTokenEntity({
      createdAt: new Date(),
      expiresIn: dayjs().add(expiresInTime.value, expiresInTime.unit).toDate(),
      tokenId: payload.tokenId,
      userId: payload.userId,
    });

    return this.refreshTokenRepository.create(refreshToken);
  }

  public async deleteRefreshSession(tokenId: string): Promise<void> {
    await this.deleteExpiredRefreshTokens();
    await this.refreshTokenRepository.deleteByTokenId(tokenId)
  }

  public async exists(tokenId: string): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(tokenId);
    return (refreshToken !== null);
  }

  public async deleteExpiredRefreshTokens() {
    await this.refreshTokenRepository.deleteExpiredTokens();
  }
}
