import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoute, ITEMS_PER_PAGE } from '@client/src/const';
import { UserRoleEnum } from '@shared/types/user-roles.enum';
import { UserSearchQuery } from '@shared/user';
import { UsersFilterDefaultParams } from '../users-filter/users-filter';

import { useAppDispatch, useAppSelector } from '@client/src/hooks';
import useSearchUsers from '@client/src/hooks/useSearchUsers';

import { getCurrentUserInfo, getUsersListLoadingStatus } from '@client/src/store/slices/user-process/user-process.selectors';
import { searchUsersAction } from '@client/src/store/actions/api-user-action';

import Spinner from '../../tools/spinner/spinner';
import Stub from '../../tools/stub/stub';
import UsersListItem from '../users-list-item/users-list-item';

const START_PAGE = 1;

export default function UsersList(): ReactElement {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(getCurrentUserInfo);
  const navigate = useNavigate();

  const isTrainer = userInfo?.role === UserRoleEnum.TRAINER;

  if (isTrainer) {
    navigate(AppRoute.MAIN);
  }

  let searchQuery: UserSearchQuery = {
    page: START_PAGE,
    limit: ITEMS_PER_PAGE,
    level: [UsersFilterDefaultParams.CHECKED_USER_LEVEL],
    sortType: UsersFilterDefaultParams.SORT_TYPE,
    sortDirection: UsersFilterDefaultParams.SORT_DIRECTION
  };

  const usersList = useSearchUsers(searchQuery);
  const isUsersLoading = useAppSelector(getUsersListLoadingStatus);

  const isShowMoreBtnVisible = Boolean(
    usersList?.totalPages
    && usersList?.totalPages > START_PAGE
    && usersList.currentPage !== usersList?.totalPages
  );

  function handleShowMoreBtnClick() {
    if (!usersList || !usersList.currentPage) {
      return;
    };

    let currentPage = usersList.currentPage;

    searchQuery = {
      page: ++currentPage,
      limit: ITEMS_PER_PAGE,
      level: [UsersFilterDefaultParams.CHECKED_USER_LEVEL],
      sortType: UsersFilterDefaultParams.SORT_TYPE,
      sortDirection: UsersFilterDefaultParams.SORT_DIRECTION
    };

    dispatch(searchUsersAction({ searchQuery, appendItems: true }));
  }

  function handleBackToBeginBtnClick() {
    searchQuery = {
      page: START_PAGE,
      limit: ITEMS_PER_PAGE,
      level: [UsersFilterDefaultParams.CHECKED_USER_LEVEL],
      sortType: UsersFilterDefaultParams.SORT_TYPE,
      sortDirection: UsersFilterDefaultParams.SORT_DIRECTION
    };

    dispatch(searchUsersAction({ searchQuery }));
  }

  // TODO: Возможно, стоит унифицировать компонент пагинации
  return (
    <div className="inner-page__content">
      <div className="users-catalog">
        {
          isUsersLoading &&
          <Spinner />
        }

        {
          (usersList?.entities && usersList?.entities.length <= 0 && !isUsersLoading) &&
          <Stub />
        }

        {
          usersList?.entities && usersList.entities.length > 0 &&
          <ul className="users-catalog__list">
            {
              usersList?.entities && usersList.entities.map((user) => {
                return (
                  <UsersListItem user={user} key={user.id} />
                )
              })
            }
          </ul>
        }

        <div className="show-more users-catalog__show-more">
          {
            isShowMoreBtnVisible &&
            <button className="btn show-more__button show-more__button--more" type="button" onClick={handleShowMoreBtnClick}>Показать еще</button>
          }
          {
            usersList && (usersList.currentPage > 1) &&
            <button className="btn show-more__button show-more__button--to-top" type="button" onClick={handleBackToBeginBtnClick}>Вернуться в начало</button>
          }
        </div>
      </div>
    </div>
  )
}
