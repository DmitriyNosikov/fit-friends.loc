import { ReactElement, useRef, useState } from 'react';
import RangeSlider from '../range-slider/range-slider';

import { debounce } from '@client/src/utils/common';

const Timeout = {
  CHANGE_RANGE: 300,
  CHANGE_INPUT: 800,
}

type FilterRangeItemProps = {
  title: string,
  min: number,
  max: number,
  showInputs?: boolean,

  containerClassName?: string,
  fieldsContainerClassName?: string,
  minFieldClassName?: string,
  maxFieldClassName?: string,

  onChange?: Function
};

export default function FilterRangeItem({
  title,
  min,
  max,
  showInputs = true,
  containerClassName,
  fieldsContainerClassName,
  minFieldClassName,
  maxFieldClassName,
  onChange
}: FilterRangeItemProps): ReactElement {
  const [startValue, setStartValue] = useState(min);
  const [endValue, setEndValue] = useState(max);

  const minField = useRef<HTMLInputElement>(null);
  const maxField = useRef<HTMLInputElement>(null);

  // Обработчики с задержкой исполнения
  const Debounce = {
    HANDLE_START_VALUE_INPUT: debounce(handleStartValueInput, Timeout.CHANGE_INPUT),
    HANDLE_END_VALUE_INPUT: debounce(handleEndValueInput, Timeout.CHANGE_INPUT),
    SET_START_VALUE: debounce(setStartValue, Timeout.CHANGE_INPUT),
    SET_END_VALUE: debounce(setEndValue, Timeout.CHANGE_INPUT),
    ON_CHANGE: onChange ? debounce(onChange, Timeout.CHANGE_RANGE) : null,
  };

  function handleRangeChange(value: string[]) {
    if(!showInputs || !minField.current || !maxField.current) {
      return;
    }

    let [newMin, newMax] = value;

    if(newMin && parseInt(newMin) !== startValue) {
      Debounce.SET_START_VALUE(newMin)
    }

    if(newMax && parseInt(newMax) !== endValue) {
      Debounce.SET_END_VALUE(newMax)
    }

    minField.current.value = newMin;
    maxField.current.value = newMax;

    if(Debounce.ON_CHANGE) {
      Debounce.ON_CHANGE(value);
    }
  }

  function handleStartValueInput(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const currentMaxValue = maxField.current?.value ? parseInt( maxField.current.value) : max;
    let newStartValue = parseInt(target.value);

    // Минимальное и максимальное значение не могут быть равны
    if(newStartValue >= currentMaxValue) {
      newStartValue  = currentMaxValue - 1;
    }

    // Минимальное значение не может быть меньше порогового
    if(newStartValue < min) {
      newStartValue = min;
    }

    if(newStartValue) {
      console.log('NEW START: ', newStartValue);
      setStartValue(newStartValue);
    }
  }

  function handleEndValueInput(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const currentMinValue = minField.current?.value ? parseInt( minField.current.value) : min;
    let newEndValue = parseInt(target.value);

    // // Минимальное и максимальное значение не могут быть равны
    if(newEndValue <= currentMinValue) {
      newEndValue  = currentMinValue + 1;
    }

    // Минимальное значение не может быть меньше порогового
    if(newEndValue > max) {
      newEndValue = max;
    }

    if(newEndValue) {
      console.log('NEW END: ', newEndValue);
      setEndValue(newEndValue);
    }
  }

  return (
    <div className={`my-training-form__block ${containerClassName}`}>
      <h4 className="my-training-form__block-title">{title}</h4>
      {
        showInputs && (
          <div className={`range-fields__container ${fieldsContainerClassName}`}>
            <div className={`range-fields__container-item--min ${minFieldClassName}`}>
              <input
                type="number"
                name="text-min"
                defaultValue={startValue}
                onChange={Debounce.HANDLE_START_VALUE_INPUT}
                ref={minField}

                min={min}
                max={max-1}
              />
              <label htmlFor="text-min">от</label>
            </div>
            <div className={`range-fields__container-item--max ${maxFieldClassName}`}>
              <input
                type="number"
                name="text-max"
                defaultValue={endValue}
                onChange={Debounce.HANDLE_END_VALUE_INPUT}
                ref={maxField}

                min={min + 1}
                max={max}
                />
              <label htmlFor="text-max">до</label>
            </div>
          </div>
        )
      }
      <div className="filter-range">
        <div className="filter-range__scale">
          <div className="filter-range__bar">
            <span className="visually-hidden">Полоса прокрутки</span>
          </div>
        </div>
        <RangeSlider start={[ startValue, endValue ]} range={{ min, max }} onUpdate={handleRangeChange} />
      </div>
    </div>
  )
}
