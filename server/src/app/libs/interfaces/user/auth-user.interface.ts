import { UserInterface } from './user.interface';

export interface AuthUserInterface extends UserInterface {
  passwordHash: string;
}
