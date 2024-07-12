import { ReactElement } from 'react';

import useAdditionalInfo from '@client/src/hooks/useAdditionalInfo';

import TrainingsDurationListItem from '../trainings-duration-list-item/trainings-duration-list-item';

const CHANGE_DURATION_TIMEOUT = 800;

type TrainingsDurationListProps = {
  onChange?: Function
};

export default function TrainingsDurationList({ onChange }: TrainingsDurationListProps): ReactElement | undefined {
  const additionalInfo = useAdditionalInfo();

  if (!additionalInfo) {
    return;
  }

  const durationList = additionalInfo.trainingDuration;
  const durationListContainer = document.querySelector('.my-training-form__block--duration');

  let changeDurationTimer: NodeJS.Timeout | null = null;

  function handleDurationChange(e: React.FormEvent<HTMLUListElement>) {
    const target = e.target;

    if ('type' in target && target.type !== 'checkbox') {
      return;
    }

    if (changeDurationTimer) {
      clearTimeout(changeDurationTimer);
    }

    changeDurationTimer = setTimeout(() => {
      const checkedDurationCheckboxes: NodeListOf<HTMLInputElement> | undefined = durationListContainer?.querySelectorAll('input[type="checkbox"]:checked');

      if (onChange && checkedDurationCheckboxes) {
        const checkedDurations: string[] = [];

        checkedDurationCheckboxes.forEach((checkbox) => {
          if ('value' in checkbox) {
            checkedDurations.push(checkbox.value);
          }
        });

        onChange(checkedDurations);
      }
    }, CHANGE_DURATION_TIMEOUT)
  }

  return (
    <div className="my-training-form__block my-training-form__block--duration">
      <h4 className="my-training-form__block-title">Длительность</h4>

      <ul className="my-training-form__check-list" onChange={handleDurationChange}>
        {
          durationList.map((duration) => {
            return <TrainingsDurationListItem durationRange={duration} key={duration} />
          })
        }
      </ul>
    </div>
  )
}
