import { ReactElement } from 'react';

type TrainingsDurationListItemProps = {
  durationRange: string
};

export default function TrainingsDurationListItem({ durationRange }: TrainingsDurationListItemProps): ReactElement {
  const [durationMin, durationMax] = durationRange.split('-');
  const duration = `${durationMin} мин - ${durationMax} мин`;

  return (
    <li className="my-training-form__check-list-item">
      <div className="custom-toggle custom-toggle--checkbox">
        <label>
          <input type="checkbox" defaultValue={durationRange} name="duration"/>
          <span className="custom-toggle__icon">
            <svg width={9} height={6} aria-hidden="true">
              <use xlinkHref="#arrow-check" />
            </svg></span><span className="custom-toggle__label">{duration}
          </span>
        </label>
      </div>
    </li>
  )
}
