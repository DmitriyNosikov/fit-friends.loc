import { ReactElement } from 'react';

import { useAppSelector } from '@client/src/hooks';
import { getUserInfo } from '@client/src/store/slices/user-process/user-process.selectors';
import { UserRoleEnum } from '@shared/types/user-roles.enum';

import PersonalAccountUser from '../../components/personal-account/personal-account-user/personal-account-user';
import PersonalAccountCoach from '../../components/personal-account/personal-account-coach/personal-account-coach';

export default function PersonalAccount(): ReactElement {
  const userInfo = useAppSelector(getUserInfo);

  return (
    <>
      {(userInfo?.role === UserRoleEnum.CLIENT || userInfo?.role === UserRoleEnum.ADMIN) &&
        <PersonalAccountUser />}

      {(userInfo?.role === UserRoleEnum.TRAINER) &&
        <PersonalAccountCoach />}
    </>
  )
}
