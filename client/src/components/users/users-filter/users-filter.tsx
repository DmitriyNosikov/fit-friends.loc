import { ReactElement } from 'react';

import BackBtn from '../../back-btn/back-btn';
import Spinner from '../../tools/spinner/spinner';
import CheckboxListWithSpoiler from '../../checkbox-list-with-spoiler/checkbox-list-with-spoiler';

import useFetchAdditionalInfo from '@client/src/hooks/useFetchAdditionalInfo';
import { useAppDispatch, useAppSelector } from '@client/src/hooks';
import { getAdditionalInfoLoadingStatus } from '@client/src/store/slices/user-process/user-process.selectors';
import { debounce, upperCaseFirst } from '@client/src/utils/common';
import { UserSearchQuery } from '@shared/user';

import { Location } from '@shared/types';
import { TrainingType, UserLevel } from '@server/libs/types';
import { searchUsersAction } from '@client/src/store/actions/api-user-action';

const MAX_FILTER_ITEMS_SHOW_COUNT = 3;
const FILTER_CHANGE_TIMEOUT = 800;

const UsersFilterSortDirection = {
  TRAINERS: 'desc',
  CLIENTS: 'asc'
} as const;

export const UsersFilterDefaultParams = {
  CHECKED_USER_LEVEL: 'любитель',
  ROLE: 'trainer',
  SORT_TYPE: 'role',
  SORT_DIRECTION: UsersFilterSortDirection.TRAINERS
} as const;

export default function UsersFilter(): ReactElement {
  const dispatch = useAppDispatch();
  const additionalInfo = useFetchAdditionalInfo();
  const isAdditionalInfoLoading = useAppSelector(getAdditionalInfoLoadingStatus);

  const filterParams: UserSearchQuery = {
    location: [],
    trainingType: [],
    level: [UsersFilterDefaultParams.CHECKED_USER_LEVEL],
    sortType: UsersFilterDefaultParams.SORT_TYPE,
    sortDirection: UsersFilterDefaultParams.SORT_DIRECTION

  }

  const debouncedHandleLevelChange = debounce(handleLevelChange, FILTER_CHANGE_TIMEOUT);
  const debouncedHandleRoleChange = debounce(handleRoleChange, FILTER_CHANGE_TIMEOUT);

  function handleLocationChange(checkedValues: string[]) {
    filterParams.location = checkedValues as Location[];

    handleFilterChange(filterParams);
  }

  function handleSpecializationChange(checkedValues: string[]) {
    filterParams.trainingType = checkedValues as TrainingType[];

    handleFilterChange(filterParams);
  }

  function handleLevelChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    filterParams.level = [target.value] as UserLevel[];

    handleFilterChange(filterParams);
  }

  function handleRoleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    filterParams.sortDirection = (target.value === 'trainer')
      ? UsersFilterSortDirection.TRAINERS
      : UsersFilterSortDirection.CLIENTS;

    handleFilterChange(filterParams);
  }

  function handleFilterChange(filterParams: UserSearchQuery) {
    dispatch(searchUsersAction({ searchQuery: filterParams }));
  }

  return (
    <div className="user-catalog-form">
      <h2 className="visually-hidden">Каталог пользователя</h2>
      <div className="user-catalog-form__wrapper">
        <BackBtn />

        <h3 className="user-catalog-form__title">Фильтры</h3>
        {
          isAdditionalInfoLoading &&
          <Spinner />
        }

        {
          additionalInfo &&
          <form className="user-catalog-form__form">
            {
              additionalInfo?.location && additionalInfo.location.length > 0 &&
              <>

                <CheckboxListWithSpoiler
                  title='Локация, станция метро'
                  items={additionalInfo.location}
                  maxShowedItemsCount={MAX_FILTER_ITEMS_SHOW_COUNT}

                  checkboxesName='location'

                  containerClass='user-catalog-form__block user-catalog-form__block--location'
                  titleClass='user-catalog-form__block-title'
                  listClass='user-catalog-form__check-list'
                  listItemClass='user-catalog-form__check-list-item'
                  showMoreBtnClass='btn-show-more user-catalog-form__btn-show'

                  onChange={handleLocationChange}
                />
              </>
            }

            {
              additionalInfo?.trainingType && additionalInfo.trainingType.length > 0 &&
              <>

                <CheckboxListWithSpoiler
                  title='Специализация'
                  items={additionalInfo.trainingType}
                  maxShowedItemsCount={MAX_FILTER_ITEMS_SHOW_COUNT}

                  checkboxesName='user-specialization'

                  containerClass='user-catalog-form__block user-catalog-form__block--spezialization'
                  titleClass='user-catalog-form__block-title'
                  listClass='user-catalog-form__check-list'
                  listItemClass='user-catalog-form__check-list-item'
                  showMoreBtnClass='btn-show-more user-catalog-form__btn-show'

                  onChange={handleSpecializationChange}
                />
              </>
            }

            {
              additionalInfo?.levels && additionalInfo.levels.length > 0 &&
              <div className="user-catalog-form__block user-catalog-form__block--level" onChange={debouncedHandleLevelChange}>
                <h4 className="user-catalog-form__block-title">Ваш уровень</h4>

                <div className="custom-toggle-radio">
                  {
                    additionalInfo.levels.map((level) => {
                      const isChecked = (level === UsersFilterDefaultParams.CHECKED_USER_LEVEL);

                      return (
                        <div className="custom-toggle-radio__block" key={level}>
                          <label>
                            <input type="radio" name="user-level" defaultValue={level} defaultChecked={isChecked} />
                            <span className="custom-toggle-radio__icon" />
                            <span className="custom-toggle-radio__label">{upperCaseFirst(level)}</span>
                          </label>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            }

            <div className="user-catalog-form__block" onChange={debouncedHandleRoleChange}>
              <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
              <div className="btn-radio-sort">
                <label>
                  <input type="radio" name="sort" defaultValue='trainer' defaultChecked />
                  <span className="btn-radio-sort__label">Тренеры</span>
                </label>
                <label>
                  <input type="radio" name="sort" defaultValue='client' />
                  <span className="btn-radio-sort__label">Пользователи</span>
                </label>
              </div>
            </div>
          </form>
        }
      </div>
    </div>
  )
}
