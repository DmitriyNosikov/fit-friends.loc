import { ReactElement } from 'react';

import TrainingsFilter from '../../components/trainings/trainings-filter/trainings-filter';
import TrainingsList from '@client/src/components/trainings/trainings-list/trainings-list';

export default function Trainings(): ReactElement {


  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Мои тренировки</h1>

          <TrainingsFilter />

          <TrainingsList />
        </div>
      </div>
    </section>

  )
}
