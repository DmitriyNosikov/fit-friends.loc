import { ReactElement } from 'react';
import RangeSlider from '../tools/range-slider/range-slider';

type CaloriesFilterProps = {
  min: number,
  max: number,
  onChange?: Function
};

export default function CaloriesFilter({ min, max, onChange }: CaloriesFilterProps): ReactElement {
  return (
    <div className="my-training-form__block my-training-form__block--calories">
      <h4 className="my-training-form__block-title">Калории</h4>
      <div className="filter-calories">
        <div className="filter-calories__input-text filter-calories__input-text--min">
          <input type="number" id="text-min-cal" name="text-min-cal" defaultValue={min}/>
          <label htmlFor="text-min-cal">от</label>
        </div>
        <div className="filter-calories__input-text filter-calories__input-text--max">
          <input type="number" id="text-max-cal" name="text-max-cal" defaultValue={max}/>
          <label htmlFor="text-max-cal">до</label>
        </div>
      </div>
      <RangeSlider range={{min, max }} onUpdate={onChange}/>
    </div>
  )
}
