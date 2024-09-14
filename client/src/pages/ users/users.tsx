import UsersFilter from '@client/src/components/users/users-filter/users-filter';
import UsersList from '@client/src/components/users/users-list/users-list';
import { ReactElement } from 'react';

export default function Users(): ReactElement {
  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Каталог пользователей</h1>

          <UsersFilter />

          <UsersList />
        </div>
      </div>
    </section>
  )
}
