import { ReactElement } from 'react';
import Nouislider from 'nouislider-react';
import "nouislider/distribute/nouislider.css";

type RangeSliderProps = {
  range: {
    min: number,
    max: number;
  },
  start?: number | number[],
  step?: number,

  onUpdate?: Function,
  onUpdateMin?: Function,
  onUpdateMax?: Function,

  sliderRef?: unknown
};

export default function RangeSlider({
  range,
  start = [range.min, range.max],
  step = 1,

  onUpdate,
  onUpdateMin,
  onUpdateMax
}: RangeSliderProps): ReactElement {

  function handleUpdate(value: string[]) {
    if(value.length > 1) {
      const [min, max] = value;
      const parsedMin = parseInt(min)
      const parsedMax = parseInt(max)

      if(onUpdateMin) {
        onUpdateMin(parsedMin);
      }

      if(onUpdateMax) {
        onUpdateMax(parsedMax);
      }
    }

    if(onUpdate) {
      const result = value.map((item) => parseInt(item));
      onUpdate(result);
    }
  }

  return (
    <div className="range-slider">
      <Nouislider
        start={start}
        range={range}
        step={step}

        connect={true}

        onUpdate={handleUpdate}

        pips={}
      />
    </div>
  )
}
