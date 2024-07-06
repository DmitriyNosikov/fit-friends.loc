import { ReactElement } from 'react';

import { TrainingSearchQuery } from '@shared/training';

import { useAppDispatch, useAppSelector } from '@client/src/hooks';
import { getTrainingsList, getTrainingsListLoadingStatus } from '@client/src/store/slices/training-process/training-process.selectors';

import useSearchTrainings from '@client/src/hooks/useSearchTrainings';
import { searchTrainings } from '@client/src/store/actions/api-training-action';

import Spinner from '../../../components/tools/spinner/spinner';
import TrainingsFilter from '../../../components/trainings/trainings-filter/trainings-filter';
import TrainingsListItem from '../../../components/trainings/trainings-list-item/trainings-list-item';

const MAX_TRAININGS_PER_PAGE = 6;

export default function TrainingsList(): ReactElement {
  const dispatch = useAppDispatch();
  const trainingsList = useAppSelector(getTrainingsList);
  const isTrainingsLoadings = useAppSelector(getTrainingsListLoadingStatus);

  let searchQuery: TrainingSearchQuery = {
    page: 1,
    limit: MAX_TRAININGS_PER_PAGE
  };

  useSearchTrainings(searchQuery);

  if(isTrainingsLoadings) {
    return <Spinner />;
  }

  if(!trainingsList) {
    return <></>;
  }

  let currentPage = trainingsList?.currentPage;

  function handleShowMoreBtnClick() {
    if(!trainingsList) {
      return;
    };

    searchQuery = {
      page: ++currentPage,
      limit: MAX_TRAININGS_PER_PAGE
    };

    dispatch(searchTrainings({ searchQuery, appendItems: true }));
  }

  const isShowMoreBtnVisible = trainingsList?.totalPages
    && trainingsList?.totalPages > 1
    && currentPage !== trainingsList?.totalPages;

  const isBackToBeginBtnVisible = trainingsList.entities.length > MAX_TRAININGS_PER_PAGE;

  console.log('LENGTH: ', trainingsList.entities.length, isBackToBeginBtnVisible);

  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Мои тренировки</h1>

          <TrainingsFilter />

          <div className="inner-page__content">
            <div className="my-trainings">
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
              <div className="show-more my-trainings__show-more">
                {
                  isShowMoreBtnVisible &&
                    <button className="btn show-more__button show-more__button--more" type="button" onClick={handleShowMoreBtnClick}>Показать еще</button>
                }
                {
                  isBackToBeginBtnVisible &&
                    <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}
