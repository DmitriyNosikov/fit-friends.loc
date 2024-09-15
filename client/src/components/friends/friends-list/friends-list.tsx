import { ReactElement } from 'react';

import FriendsListItem from '../friends-list-item/friends-list-item';
import Spinner from '@client/src/components/tools/spinner/spinner';

import { ITEMS_PER_PAGE } from '@client/src/const';

import { useAppDispatch, useAppSelector } from '@client/src/hooks';
import { BaseSearchQuery } from '@shared/types';
import {  getUserFriendsLoadingStatus } from '@client/src/store/slices/user-process/user-process.selectors';
import useFetchUserFriends from '@client/src/hooks/useFetchUserFriends';
import { fetchUserFriendsAction } from '@client/src/store/actions/api-user-action';
import Stub from '../../tools/stub/stub';

const START_PAGE = 1;

export default function FriendsList(): ReactElement {
  const dispatch = useAppDispatch();

  let searchQuery: BaseSearchQuery = {
    page: START_PAGE,
    limit: ITEMS_PER_PAGE
  };

  const friendsList = useFetchUserFriends({ searchQuery });
  const isUserFriendsLoading = useAppSelector(getUserFriendsLoadingStatus);

  const isShowMoreBtnVisible = Boolean(
    friendsList?.totalPages
    && friendsList?.totalPages > START_PAGE
    && friendsList.currentPage !== friendsList?.totalPages
  );

  function handleShowMoreBtnClick() {
    if (!friendsList || !friendsList.currentPage) {
      return;
    };

    let currentPage = friendsList.currentPage;

    searchQuery = {
      page: ++currentPage,
      limit: ITEMS_PER_PAGE
    };

    dispatch(fetchUserFriendsAction({ searchQuery, appendItems: true }));
  }

  function handleBackToBeginBtnClick() {
    searchQuery = {
      page: START_PAGE,
      limit: ITEMS_PER_PAGE
    };

    dispatch(fetchUserFriendsAction({ searchQuery }));
  }
  return (
    <>
      {
        isUserFriendsLoading &&
        <Spinner />
      }

      {
        (!friendsList?.entities || friendsList.entities.length <= 0) &&
        <Stub />
      }

      {
        friendsList?.entities && friendsList.entities.length > 0 &&
        <ul className="friends-list__list">
          {
            friendsList.entities.map((friend) => <FriendsListItem user={friend} key={friend.id}/>)
          }
        </ul>
      }

      <div className="show-more friends-list__show-more">
        {
          isShowMoreBtnVisible &&
          <button className="btn show-more__button show-more__button--more" type="button" onClick={handleShowMoreBtnClick}>Показать еще</button>
        }
        {
          friendsList && (friendsList.currentPage > 1) &&
          <button className="btn show-more__button show-more__button--to-top" type="button" onClick={handleBackToBeginBtnClick}>Вернуться в начало</button>
        }
      </div>
    </>
  )
}
