import { ReactElement } from 'react';

import { useAppSelector } from '@client/src/hooks';
import { getUserInfo } from '@client/src/store/slices/user-process/user-process.selectors';

import { UserRoleEnum } from '@shared/types/user-roles.enum';

import PersonalCardTrainer from '../../components/personal-card/personal-card-trainer/personal-card-trainer';
import PersonalCardUser from '../../components/personal-card/personal-card-user/personal-card-user';
import BackBtn from '@client/src/components/back-btn/back-btn';

// TODO: Доработать персональные карточки (пока готова только разметка)
// FIXME: При переходе на карточку, нужно получать роль конкретного пользователя
// на которого мы перешли, а не того, пот кем мы сейчас залогинены

export default function PersonalCard(): ReactElement {
  const userInfo = useAppSelector(getUserInfo);
  const isTrainer = (userInfo?.role === UserRoleEnum.TRAINER);

  return (
    <div className="inner-page inner-page--no-sidebar">
      <div className="container">
        <div className="inner-page__wrapper">

          <BackBtn />

          <div className="inner-page__content">
            {
              isTrainer &&
              <PersonalCardTrainer />
            }

            {
              !isTrainer &&
              <PersonalCardUser />
            }
          </div>
        </div>
      </div>
    </div>
  )
}
