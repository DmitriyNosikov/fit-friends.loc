import { ReactElement } from 'react';

import { useAppSelector } from '@client/src/hooks';
import { getCurrentUserInfo } from '@client/src/store/slices/user-process/user-process.selectors';
import { UserRoleEnum } from '@shared/types/user-roles.enum';

import PersonalAccountUser from '../../components/personal-account/personal-account-user/personal-account-user';
import PersonalAccountCoach from '../../components/personal-account/personal-account-coach/personal-account-coach';
import PersonalAccountForm from '@client/src/components/personal-account/personal-account-form/personal-account-form';
import Spinner from '@client/src/components/tools/spinner/spinner';
import useFetchAdditionalInfo from '@client/src/hooks/useFetchAdditionalInfo';

export default function PersonalAccount(): ReactElement {
  useFetchAdditionalInfo();

  const userInfo = useAppSelector(getCurrentUserInfo);

  if (!userInfo) {
    return <Spinner />;
  }

  return (
    <section className="inner-page">
      <div className="container">
        {
          userInfo &&
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Личный кабинет</h1>

            <PersonalAccountForm userInfo={userInfo} />

            <div className="inner-page__content">
              {(userInfo?.role === UserRoleEnum.CLIENT || userInfo?.role === UserRoleEnum.ADMIN) &&
                <PersonalAccountUser userInfo={userInfo} />}

              {(userInfo?.role === UserRoleEnum.TRAINER) &&
                <PersonalAccountCoach />}
            </div>
          </div>
        }
      </div>
    </section>
  )
}
