import { UserInterface } from './user.interface';

export interface AuthUserInterface extends UserInterface {
  role?: string;
  passwordHash: string;
}
