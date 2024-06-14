import { TokenPayloadInterface } from './token-payload.interface';

export interface RefreshTokenPayloadInterface extends TokenPayloadInterface {
  tokenId: string;
}
