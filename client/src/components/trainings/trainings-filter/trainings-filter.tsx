import { ReactElement } from 'react';

import { TrainingValidation } from '@server/training/training.constant';
import useFetchTrainingFilterParams from '@client/src/hooks/useFetchTrainingFilterParams';

import BackBtn from '../../back-btn/back-btn';
import RangeSlider from '../../tools/range-slider/range-slider';
import TrainigsTypeList from '../trainings-type-list/trainings-type-list';
import FilterRangeItem from '../../tools/filter-range-item/filter-range-item';
import { TrainingSearchQuery } from '@shared/training';
import { debounce } from '@client/src/utils/common';
import { useAppDispatch, useAppSelector } from '@client/src/hooks';
import { searchTrainingsAction } from '@client/src/store/actions/api-training-action';
import { getUserInfo } from '@client/src/store/slices/user-process/user-process.selectors';
import { UserRoleEnum } from '@shared/types/user-roles.enum';
import TrainingsDurationList from '../trainings-duration-list/trainings-duration-list';
import { DEFAULT_TRAININGS_SORT_TYPE } from '../trainings-list/trainings-list';

const CHANGE_FILTER_TIMEOUT = 800;

export const SortDirectionEnum = {
  ASC: 'asc', // По возрастанию
  DESC: 'desc', // По убыванию
  FREE: 'free', // Специальный фильтр по бесплатным тренировкам
} as const;

export default function TrainingsFilter(): ReactElement | undefined {
  const dispatch = useAppDispatch();
  const baseFilterParams = useFetchTrainingFilterParams();
  const userInfo = useAppSelector(getUserInfo);

  const isTrainer = userInfo?.role === UserRoleEnum.TRAINER;

  if (!baseFilterParams) {
    return;
  }

  const { price, calories } = baseFilterParams;

  const filterParams = {
    priceFrom: price.min,
    priceTo: price.max,
    trainingType: [] as string[],
    trainingDuration: [] as string[],
    dayCaloriesFrom: calories.min,
    dayCaloriesTo: calories.max,
    ratingFrom: Number(TrainingValidation.RATING.MIN),
    ratingTo: Number(TrainingValidation.RATING.MAX),
    sortType: 'price',
    sortDirection: String(SortDirectionEnum.ASC)
  }

  const debouncedChangeFilterHandler = debounce(handleFilterChange, CHANGE_FILTER_TIMEOUT);

  function handlePriceChange(priceRanges: string[]) {
    const [priseFrom, priceTo] = priceRanges;

    filterParams.priceFrom = parseInt(priseFrom);
    filterParams.priceTo = parseInt(priceTo);

    debouncedChangeFilterHandler(filterParams);
  }

  function handleCaloriesChange(caloriesRanges: string[]) {
    const [caloriesFrom, caloriesTo] = caloriesRanges;

    filterParams.dayCaloriesFrom = parseInt(caloriesFrom);
    filterParams.dayCaloriesTo = parseInt(caloriesTo);

    debouncedChangeFilterHandler(filterParams);
  }

  function handleRatingChange(ratingRanges: string[]) {
    const [ratingFrom, ratingTo] = ratingRanges;
    const newRatingFrom = parseInt(ratingFrom);
    const newRatingTo = parseInt(ratingTo);


    if (
      newRatingFrom === filterParams.ratingFrom &&
      newRatingTo === filterParams.ratingTo
    ) {
      return;
    }

    filterParams.ratingFrom = newRatingFrom;
    filterParams.ratingTo = newRatingTo;

    debouncedChangeFilterHandler(filterParams);
  }

  function handleTypeChange(typesList: string[]) {
    filterParams.trainingType = typesList;

    debouncedChangeFilterHandler(filterParams);
  }

  function handleDurationChange(durationsList: string[]) {
    filterParams.trainingDuration = durationsList;

    debouncedChangeFilterHandler(filterParams);
  }

  function handleSortTypeChange(e: React.FormEvent<HTMLDivElement>) {
    const target = e.target as HTMLInputElement;

    if (!target.value) {
      return;
    }

    const sortDirection = target.value;

    filterParams.sortDirection = sortDirection;

    if (sortDirection === SortDirectionEnum.FREE) {
      filterParams.priceFrom = 0;
      filterParams.priceTo = 0;
      filterParams.sortDirection = SortDirectionEnum.DESC;
    }

    console.log('FILTER PARAMS: ', filterParams);

    debouncedChangeFilterHandler(filterParams);
  }

  function handleFilterChange(filterParams: TrainingSearchQuery) {
    if(isTrainer) {
      filterParams['userId'] = userInfo.id;
      filterParams['sortType'] = DEFAULT_TRAININGS_SORT_TYPE;
      filterParams['searchByUser'] = true;
    }

    dispatch(searchTrainingsAction({ searchQuery: filterParams }));
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
                <div className="filter-raiting__bar">
                  <span className="visually-hidden">Полоса прокрутки</span>
                </div>
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

          {
            !isTrainer &&
            <TrainigsTypeList onChange={handleTypeChange} />
          }

          {
            !isTrainer &&
            <div className="gym-catalog-form__block gym-catalog-form__block--sort" onChange={handleSortTypeChange}>
              <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
              <div className="btn-radio-sort gym-catalog-form__radio">
                <label>
                  <input type="radio" name="sort" defaultValue={SortDirectionEnum.ASC} defaultChecked />
                  <span className="btn-radio-sort__label">Дешевле</span>
                </label>
                <label>
                  <input type="radio" name="sort" defaultValue={SortDirectionEnum.DESC} />
                  <span className="btn-radio-sort__label">Дороже</span>
                </label>
                <label>
                  <input type="radio" name="sort" defaultValue={SortDirectionEnum.FREE} />
                  <span className="btn-radio-sort__label">Бесплатные</span>
                </label>
              </div>
            </div>
          }

          {
            isTrainer && <TrainingsDurationList onChange={handleDurationChange} />
          }
        </form>
      </div>
    </div>
  )
}
