import { CreatedUpdatedDatesInterface } from '../created-updated-dates.interface';

export interface UserInterface extends CreatedUpdatedDatesInterface {
  id?: string;
  name: string;
  email: string;
}
