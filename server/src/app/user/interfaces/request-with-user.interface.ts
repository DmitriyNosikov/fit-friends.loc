import { UserEntity } from '../user.entity';


export interface RequestWithUser {
  user?: UserEntity;
}
