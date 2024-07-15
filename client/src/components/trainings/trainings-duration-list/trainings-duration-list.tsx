import { ReactElement } from 'react';

import useAdditionalInfo from '@client/src/hooks/useAdditionalInfo';

import CheckboxList from '../../tools/checkbox-list/checkbox-list';

const CLASS_LIST = {
  CHECKBOX_CONTAINER: 'my-training-form__block--duration',
  CHECKBOX_ITEM: 'my-training-form__check-list-item',
} as const;

type TrainingsDurationListProps = {
  onChange?: Function
};

export default function TrainingsDurationList({ onChange }: TrainingsDurationListProps): ReactElement | undefined {
  const additionalInfo = useAdditionalInfo();

  if (!additionalInfo) {
    return;
  }

  const durationList = additionalInfo.trainingDuration;

  function handleDurationChange(checkedItems: string[]) {
    console.log('DURATION CHECKED ITEMS: ', checkedItems);

    if(onChange) {
      onChange(checkedItems);
    }
  }

  function itemModifier(item: string) {
    const [durationMin, durationMax] = item.split('-');
    return`${durationMin} мин - ${durationMax} мин`;
  }


  return (
    <div className="my-training-form__block my-training-form__block--duration">
      <h4 className="my-training-form__block-title">Длительность</h4>

      <CheckboxList
        itemsList={durationList}
        listContainerClassName={CLASS_LIST.CHECKBOX_CONTAINER}
        listItemClassName={CLASS_LIST.CHECKBOX_ITEM}
        onChangeHandler={handleDurationChange}
        itemModifier={itemModifier}
      />
    </div>
  )
}
