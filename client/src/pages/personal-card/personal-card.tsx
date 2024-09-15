import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import { UserRoleEnum } from '@shared/types/user-roles.enum';

import PersonalCardTrainer from '../../components/personal-card/personal-card-trainer/personal-card-trainer';
import PersonalCardUser from '../../components/personal-card/personal-card-user/personal-card-user';
import BackBtn from '@client/src/components/back-btn/back-btn';
import Spinner from '@client/src/components/tools/spinner/spinner';
import useFetchUserById from '@client/src/hooks/useFetchUserById';


export default function PersonalCard(): ReactElement {
  const param = useParams<{ userId: string }>();
  const userId = param.userId as string;
  const userInfo = useFetchUserById(userId);

  if (!userInfo) {
    return <Spinner />
  }

  const isTrainer = (userInfo?.role === UserRoleEnum.TRAINER);

  return (
    <div className="inner-page inner-page--no-sidebar">
      <div className="container">
        <div className="inner-page__wrapper">

          <BackBtn />

          <div className="inner-page__content">
            {
              isTrainer &&
              <PersonalCardTrainer userInfo={ userInfo } />
            }

            {
              !isTrainer &&
              <PersonalCardUser userInfo={ userInfo } />
            }
          </div>
        </div>
      </div>
    </div>
  )
}
