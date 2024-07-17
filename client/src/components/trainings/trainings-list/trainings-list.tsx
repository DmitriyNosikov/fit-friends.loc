import { ReactElement } from 'react';

import { useAppDispatch, useAppSelector } from '@client/src/hooks';
import useSearchTrainings from '@client/src/hooks/useSearchTrainings';
import { searchTrainingsAction } from '@client/src/store/actions/api-training-action';
import { getTrainingsListLoadingStatus } from '@client/src/store/slices/training-process/training-process.selectors';
import { TrainingSearchQuery } from '@shared/training';

import TrainingsListItem from '../trainings-list-item/trainings-list-item';
import Stub from '../../tools/stub/stub';
import Spinner from '../../tools/spinner/spinner';

const MAX_TRAININGS_PER_PAGE = 6;

export default function TrainingsList(): ReactElement {
  let searchQuery: TrainingSearchQuery = {
    page: 1,
    limit: MAX_TRAININGS_PER_PAGE
  };

  const dispatch = useAppDispatch();
  const trainingsList = useSearchTrainings(searchQuery);
  const isTrainingsLoadings = useAppSelector(getTrainingsListLoadingStatus);

  function handleShowMoreBtnClick() {
    if (!trainingsList || !trainingsList.currentPage) {
      return;
    };

    let currentPage = trainingsList.currentPage;

    searchQuery = {
      page: ++currentPage,
      limit: MAX_TRAININGS_PER_PAGE
    };

    dispatch(searchTrainingsAction({ searchQuery, appendItems: true }));
  }

  const isShowMoreBtnVisible = trainingsList?.totalPages
    && trainingsList?.totalPages > 1
    && trainingsList.currentPage !== trainingsList?.totalPages;

  return (
    <div className="inner-page__content">
      <div className="my-trainings">
        {
          isTrainingsLoadings &&
          <Spinner />
        }

        {
          !trainingsList && !isTrainingsLoadings &&
          <Stub />
        }

        {
          trainingsList && (
            <ul className="my-trainings__list">
              {
                trainingsList?.entities && trainingsList.entities.map((trainingItem) => {
                  const item = {
                    ...trainingItem,
                    id: trainingItem.id as string,
                    rating: trainingItem.rating as number
                  };

                  return (
                    <li className="my-trainings__item" key={item.id}>
                      <TrainingsListItem item={item} />
                    </li>
                  )
                })
              }
            </ul>
          )
        }
        <div className="show-more my-trainings__show-more">
          {
            isShowMoreBtnVisible &&
            <button className="btn show-more__button show-more__button--more" type="button" onClick={handleShowMoreBtnClick}>Показать еще</button>
          }
          {
            trainingsList && (trainingsList.entities.length > MAX_TRAININGS_PER_PAGE) &&
            <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
          }
        </div>
      </div>
    </div>
  )
}
