import { ReactElement } from 'react';

import Spinner from '@client/src/components/tools/spinner/spinner';
import Stub from '../../tools/stub/stub';
import FriendsListItem from '../friends-list-item/friends-list-item';

import { ITEMS_PER_PAGE } from '@client/src/const';
import { BaseSearchQuery } from '@shared/types';
import { RequestTypeEnum } from '@shared/request/types/request-type.enum';

import {  getUserFriendsLoadingStatus } from '@client/src/store/slices/user-process/user-process.selectors';
import { fetchUserFriendsAction } from '@client/src/store/actions/api-user-action';
import { useAppDispatch, useAppSelector } from '@client/src/hooks';
import useFetchUserFriends from '@client/src/hooks/useFetchUserFriends';
import useFetchCurrentUserRequests from '@client/src/hooks/useFetchUserRequests';

const START_PAGE = 1;

export default function FriendsList(): ReactElement {
  const dispatch = useAppDispatch();

  let searchQuery: BaseSearchQuery = {
    page: START_PAGE,
    limit: ITEMS_PER_PAGE
  };

  const friendsList = useFetchUserFriends({ searchQuery });
  const isUserFriendsLoading = useAppSelector(getUserFriendsLoadingStatus);

  const userRequests  = useFetchCurrentUserRequests({ requestType: RequestTypeEnum.TRAINING });

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
            friendsList.entities.map((friend) => <FriendsListItem user={friend} userRequests={userRequests} key={friend.id}/>)
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
