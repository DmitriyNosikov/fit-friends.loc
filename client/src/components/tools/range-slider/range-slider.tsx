import { ReactElement } from 'react';
import Nouislider from 'nouislider-react';
import "nouislider/distribute/nouislider.css";

type RangeSliderProps = {
  range: {
    min: number,
    max: number;
  },
  start?: number,
  step?: number,

};

export default function RangeSlider({ range, start = 0, step = 1 }: RangeSliderProps): ReactElement {
  return (
    <div className="range-slider">
      <Nouislider
        start={start}
        range={range}
        step={step}

        connect
      />
    </div>
  )
}
