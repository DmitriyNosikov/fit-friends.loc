
import { AuthUserInterface } from '../libs/interfaces';
import { StorableEntityInterface } from '../libs/interfaces';
import { Entity } from '../libs/entities';


export class UserEntity extends Entity implements StorableEntityInterface<AuthUserInterface> {
  public createdAt?: Date;
  public updatedAt?: Date;
  public email: string;
  public name: string;
  public passwordHash: string;

  constructor(user?: AuthUserInterface) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUserInterface) {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.email = user.email;
    this.name = user.name ?? '';
    this.passwordHash = user.passwordHash;
  }

  public setPassword(password: string) {
    this.passwordHash = password;
  }

  public toPOJO(): AuthUserInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      name: this.name,
      email: this.email,
      passwordHash: this.passwordHash,
    };
  }
}
