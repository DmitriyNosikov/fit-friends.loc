export interface HasherInterface {
  getHash(value: string): Promise<string>;
  checkHash(value: string, hashedValue: string): Promise<boolean>;
}
