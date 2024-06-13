export interface StorableJWTTokenInterface {
  id?: string;
  createdAt: Date;
  expiresIn: Date;
  tokenId: string;
  userId: string;
}
