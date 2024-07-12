import { ReactElement } from 'react';
import BackBtn from '../../back-btn/back-btn';
import useTrainingFilterParams from '@client/src/hooks/useTrainingFilterParams';
import { TrainingValidation } from '@server/training/training.constant';
import TrainingsDurationList from '../trainings-duration-list/trainings-duration-list';
import RangeSlider from '../../tools/range-slider/range-slider';

export default function TrainingsFilter(): ReactElement | undefined {
  const filterParams = useTrainingFilterParams();

  if(!filterParams) {
    return;
  }

  const { price, calories } = filterParams;

  function handleDurationChange(durationRanges: string[]) {
    console.log('durationRanges: ', durationRanges);
  }

  return (
    <div className="my-training-form">
      <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
      <div className="my-training-form__wrapper">

        <BackBtn />

        <h3 className="my-training-form__title">фильтры</h3>

        <RangeSlider range={{ min: 10, max: 100 } }/>

        <form className="my-training-form__form">
          <div className="my-training-form__block my-training-form__block--price">
            <h4 className="my-training-form__block-title">Цена, ₽</h4>
            <div className="filter-price">
              <div className="filter-price__input-text filter-price__input-text--min">
                <input type="number" id="text-min" name="text-min" defaultValue={price.min} />
                <label htmlFor="text-min">от</label>
              </div>
              <div className="filter-price__input-text filter-price__input-text--max">
                <input type="number" id="text-max" name="text-max" defaultValue={price.max} />
                <label htmlFor="text-max">до</label>
              </div>
            </div>
            <div className="filter-range">
              <div className="filter-range__scale">
                <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
              </div>
              <div className="filter-range__control">
                <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное значение</span></button>
                <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное значение</span></button>
              </div>
            </div>
          </div>
          <div className="my-training-form__block my-training-form__block--calories">
            <h4 className="my-training-form__block-title">Калории</h4>
            <div className="filter-calories">
              <div className="filter-calories__input-text filter-calories__input-text--min">
                <input type="number" id="text-min-cal" name="text-min-cal" defaultValue={calories.min}/>
                <label htmlFor="text-min-cal">от</label>
              </div>
              <div className="filter-calories__input-text filter-calories__input-text--max">
                <input type="number" id="text-max-cal" name="text-max-cal" defaultValue={calories.max}/>
                <label htmlFor="text-max-cal">до</label>
              </div>
            </div>
            <div className="filter-range">
              <div className="filter-range__scale">
                <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
              </div>
              <div className="filter-range__control">
                <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное значение</span></button>
                <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное значение</span></button>
              </div>
            </div>
          </div>
          <div className="my-training-form__block my-training-form__block--raiting">
            <h4 className="my-training-form__block-title">Рейтинг</h4>
            <div className="filter-raiting">
              <div className="filter-raiting__scale">
                <div className="filter-raiting__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
              </div>
              <div className="filter-raiting__control">
                <button className="filter-raiting__min-toggle"><span className="visually-hidden">Минимальное значение</span></button><span>{TrainingValidation.RATING.MIN}</span>
                <button className="filter-raiting__max-toggle"><span className="visually-hidden">Максимальное значение</span></button><span>{TrainingValidation.RATING.MAX}</span>
              </div>
            </div>
          </div>

          <TrainingsDurationList onChange={handleDurationChange}/>
        </form>
      </div>
    </div>
  )
}
