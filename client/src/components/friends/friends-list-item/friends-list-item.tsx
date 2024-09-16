import { ReactElement } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { AppRoute } from '@client/src/const';
import { UserRDO } from '@shared/user';
import { CreateRequestDTO, CreateRequestRDO, UpdateRequestDTO } from '@shared/request';
import { RequestTypeEnum } from '@shared/request/types/request-type.enum';
import { UserRoleEnum } from '@shared/types/user-roles.enum';

import { getAvatarByUrl, upperCaseFirst } from '@client/src/utils/common';

import { useAppDispatch, useAppSelector } from '@client/src/hooks';
import { createRequestAction, RequestIdPayload, updateRequestAction } from '@client/src/store/actions/api-request-action';
import { getCurrentUserInfo } from '@client/src/store/slices/user-process/user-process.selectors';

import { RequestStatusEnum } from '@shared/request/types/request-status.enum';

type FriendsListItemProps = {
  user: UserRDO,
  userRequests?: CreateRequestRDO[] | null
}

export default function FriendsListItem({ user, userRequests }: FriendsListItemProps): ReactElement {
  const dispatch = useAppDispatch();
  const currentLoggedUserInfo = useAppSelector(getCurrentUserInfo);

  const { id, name, avatar, location, trainingType, isReadyToTraining, role } = user;
  const userAvatar = getAvatarByUrl(avatar);

  const readyToTrainingStatusText = isReadyToTraining ? 'Готов к тренировке' : 'Не готов к тренировке';
  const isTrainer = (role === UserRoleEnum.TRAINER);

  // Исходящие и входящие запросы пользователя на тренировки
  const outgoingRequests: CreateRequestRDO[] = [];
  const incomingRequests: CreateRequestRDO[] = [];

  if (currentLoggedUserInfo && userRequests && userRequests.length > 0) {
    userRequests.forEach((request) => {
      // Собираем все исходящие запросы (от текущего юзера к цели)
      if (request.initiatorUserId === currentLoggedUserInfo.id && request.targetUserId === id) {
        outgoingRequests.push(request);
      }

      // Собираем все входящие запросы (от цели к текущему юзеру)
      if (request.initiatorUserId === id && request.targetUserId === currentLoggedUserInfo.id) {
        incomingRequests.push(request);
      }
    });
  }

  const incomingTrainingRequest = currentLoggedUserInfo ? incomingRequests.find((request) => request.targetUserId === currentLoggedUserInfo.id) : undefined;
  const outTrainingRequest = currentLoggedUserInfo ? outgoingRequests.find((request) => request.initiatorUserId === currentLoggedUserInfo.id) : undefined;
  const isTrainingRequestSended = outTrainingRequest && outTrainingRequest.status === RequestStatusEnum.PROCESSING;

  // Сюда можно добавлять условия отображения блока уведомлений под карточкой пользователя
  const isNotificationBlockVisible = isTrainingRequestSended || incomingTrainingRequest;

  function handleSendRequestToTraining() {
    const requestData: CreateRequestDTO = {
      requestType: RequestTypeEnum.TRAINING,
      targetUserId: id
    };

    dispatch(createRequestAction(requestData));
  }

  function handleAcceptRequestBtnClick() {
    if(!incomingTrainingRequest) {
      return;
    }

    const updateRequestData: UpdateRequestDTO  & RequestIdPayload = {
      requestId: incomingTrainingRequest.id as string,
      status: RequestStatusEnum.ACCEPTED
    };

    dispatch(updateRequestAction(updateRequestData));
  }

  function handleDeclineRequestBtnClick() {
    if(!incomingTrainingRequest) {
      return;
    }

    const updateRequestData: UpdateRequestDTO  & RequestIdPayload = {
      requestId: incomingTrainingRequest.id as string,
      status: RequestStatusEnum.DECLINED
    }

    dispatch(updateRequestAction(updateRequestData));
  }

  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div className={classNames(
          'thumbnail-friend__info',
          { 'thumbnail-friend__info--theme-light': !isTrainer },
          { 'thumbnail-friend__info--theme-dark': isTrainer }
        )}>
          <div className="thumbnail-friend__image-status">
            <Link to={`${AppRoute.PERSONAL_CARD}/${id}`}>
              <div className="thumbnail-friend__image">
                <picture>
                  <img src={userAvatar} srcSet={`${userAvatar}@2x.jpg 2x`} width={78} height={78} />
                </picture>
                {/*<div class="thumbnail-friend__online-status thumbnail-friend__online-status--is-online"></div>*/}
              </div>
            </Link>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{name}</h2>
            <div className="thumbnail-friend__location">
              <svg width={14} height={16} aria-hidden="true">
                <use xlinkHref="#icon-location" />
              </svg>
              <address className="thumbnail-friend__location-address">{upperCaseFirst(location)}</address>
            </div>
          </div>

          {
            trainingType.length > 0 &&
            <ul className="thumbnail-friend__training-types-list">
              {
                trainingType.map((type) => (
                  <li key={type}>
                    <div className="hashtag thumbnail-friend__hashtag">
                      <span>#{type}</span>
                    </div>
                  </li>
                ))
              }
            </ul>
          }

          <div className="thumbnail-friend__activity-bar">
            <div className={classNames(
              'thumbnail-friend__ready-status',
              { 'thumbnail-friend__ready-status--is-ready': isReadyToTraining },
              { 'thumbnail-friend__ready-status--is-not-ready': !isReadyToTraining }
            )}>
              <span>{readyToTrainingStatusText}</span>
            </div>

            {
              !isTrainer && !isTrainingRequestSended && !incomingTrainingRequest &&
              <button className="thumbnail-friend__invite-button" type="button" disabled={!isReadyToTraining} onClick={handleSendRequestToTraining}>
                <svg width={43} height={46} aria-hidden="true" focusable="false">
                  <use xlinkHref="#icon-invite" />
                </svg><span className="visually-hidden">Пригласить друга на совместную тренировку</span>
              </button>
            }
          </div>
        </div>

        {
          isNotificationBlockVisible &&
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            { // Входящий запрос на тренировку
              incomingTrainingRequest && incomingTrainingRequest.status === RequestStatusEnum.PROCESSING &&
              <>
                <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку</p>
                <div className="thumbnail-friend__button-wrapper">
                  <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button" onClick={handleAcceptRequestBtnClick}>Принять</button>
                  <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button" onClick={handleDeclineRequestBtnClick}>Отклонить</button>
                </div>
              </>
            }

            {
              isTrainingRequestSended && outTrainingRequest.status === RequestStatusEnum.PROCESSING &&
              <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку отправлен</p>
            }

            { // Запрос принят, если: 1) Мы отправили запрос и его приняли 2)  Нам отправили запрос и мы его приняли
               (isTrainingRequestSended && outTrainingRequest.status === RequestStatusEnum.ACCEPTED) ||
               (incomingTrainingRequest && incomingTrainingRequest.status === RequestStatusEnum.ACCEPTED) &&
              <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку принят</p>
            }

            { //  Запрос принят, если: 1) Мы отправили запрос и его отклонили 2)  Нам отправили запрос и мы его отклонили
              (isTrainingRequestSended && outTrainingRequest.status === RequestStatusEnum.DECLINED) ||
              (incomingTrainingRequest && incomingTrainingRequest.status === RequestStatusEnum.DECLINED) &&
              <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку отклонён</p>
            }
          </div>
        }
      </div>
    </li>
  )
}
