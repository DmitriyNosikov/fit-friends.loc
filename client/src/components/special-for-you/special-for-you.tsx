import { ReactElement } from 'react';

import { useAppSelector } from '@client/src/hooks';
import useConvenientTrainingsList from '@client/src/hooks/useConvenientTrainingsList';

import {
  getConvenientTrainingsLoadingStatus,
  getUserConvenientTrainings
} from '@client/src/store/slices/training-process/training-process.selectors';

import Spinner from '../tools/spinner/spinner';
import SpecialForYouItem from './special-for-you-item/special-for-you-item';
import Stub from '../tools/stub/stub';

export default function SpecialForYou(): ReactElement {
  useConvenientTrainingsList();

  const convenientTrainings = useAppSelector(getUserConvenientTrainings);
  const loadingStatus = useAppSelector(getConvenientTrainingsLoadingStatus);

  if(loadingStatus) {
    return <Spinner />
  }


  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">
              Специально подобрано для вас
            </h2>
            <div className="special-for-you__controls">
              <button
                className="btn-icon special-for-you__control"
                type="button"
                aria-label="previous"
              >
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#arrow-left" />
                </svg>
              </button>
              <button
                className="btn-icon special-for-you__control"
                type="button"
                aria-label="next"
              >
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#arrow-right" />
                </svg>
              </button>
            </div>
          </div>

          {
            (!convenientTrainings?.entities || convenientTrainings?.entities.length <= 0) && <Stub />
          }

          <ul className="special-for-you__list">
            {
              convenientTrainings?.entities && convenientTrainings.entities.map((training) => {
                const itemProps = {
                  id: training.id as string,
                  background: training.background,
                  title: training.title
                };

                return (
                  <li className="special-for-you__item" key={training.id}>
                    <SpecialForYouItem training={itemProps}/>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </section>
  );
}
