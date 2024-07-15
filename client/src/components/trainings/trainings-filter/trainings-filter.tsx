import { ReactElement } from 'react';

import { TrainingValidation } from '@server/training/training.constant';
import useTrainingFilterParams from '@client/src/hooks/useTrainingFilterParams';

import BackBtn from '../../back-btn/back-btn';
import RangeSlider from '../../tools/range-slider/range-slider';
import TrainigsTypeList from '../trainings-type-list/trainings-type-list';
import CaloriesFilter from '../../calories-filter/calories-filter';
import FilterRangeItem from '../../tools/filter-range-item/filter-range-item';

export default function TrainingsFilter(): ReactElement | undefined {
  const filterParams = useTrainingFilterParams();

  if (!filterParams) {
    return;
  }

  const { price, calories } = filterParams;


  function handlePriceChange(priceRanges: string[]) {
    console.log('PRICES: ', priceRanges);
  }

  function handleCaloriesChange(caloriesRanges: string[]) {
    console.log('CALORIES: ', caloriesRanges);
  }

  function handleRatingChange(ratingRanges: string[]) {
    console.log('RATING: ', ratingRanges);
  }

  function handleTypeChange() {

  }

  return (
    <div className="my-training-form">
      <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
      <div className="my-training-form__wrapper">

        <BackBtn />

        <h3 className="my-training-form__title">фильтры</h3>

        <form className="my-training-form__form">
          <FilterRangeItem
            title='Цена, ₽'
            min={price.min}
            max={price.max}

            containerClassName='gym-catalog-form__block--price'
            fieldsContainerClassName='filter-price'
            minFieldClassName='filter-price__input-text filter-price__input-text--min'
            maxFieldClassName='filter-price__input-text filter-price__input-text--max'

            onChange={handlePriceChange}
          />

          <FilterRangeItem
            title='Калории'
            min={calories.min}
            max={calories.max}

            containerClassName='gym-catalog-form__block--calories'
            fieldsContainerClassName='filter-calories'
            minFieldClassName='filter-calories__input-text filter-calories__input-text--min'
            maxFieldClassName='filter-calories__input-text filter-calories__input-text--max'

            onChange={handleCaloriesChange}
          />

          <div className="my-training-form__block my-training-form__block--raiting">
            <h4 className="my-training-form__block-title">Рейтинг</h4>
            <div className="filter-raiting">
              <div className="filter-raiting__scale">
                <div className="filter-raiting__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
              </div>

              <RangeSlider
                range={{ min: TrainingValidation.RATING.MIN, max: TrainingValidation.RATING.MAX }}
                onUpdate={handleRatingChange}
              />

              <div className="filter-raiting__control">
                <span>{TrainingValidation.RATING.MIN}</span>
                <span>{TrainingValidation.RATING.MAX}</span>
              </div>
            </div>
          </div>

          <TrainigsTypeList onChange={handleTypeChange} />

          <div className="gym-catalog-form__block gym-catalog-form__block--sort">
            <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
            <div className="btn-radio-sort gym-catalog-form__radio">
              <label>
                <input type="radio" name="sort" defaultChecked /><span className="btn-radio-sort__label">Дешевле</span>
              </label>
              <label>
                <input type="radio" name="sort" /><span className="btn-radio-sort__label">Дороже</span>
              </label>
              <label>
                <input type="radio" name="sort" /><span className="btn-radio-sort__label">Бесплатные</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
