import useAdditionalInfo from '@client/src/hooks/useAdditionalInfo';
import { ReactElement } from 'react';
import CheckboxList from '../../tools/checkbox-list/checkbox-list';

const CLASS_LIST = {
  CHECKBOX_CONTAINER: 'gym-catalog-form__check-list',
  CHECKBOX_ITEM: 'gym-catalog-form__check-list-item',
} as const;

type TrainigsTypeListProps = {
  onChange: Function
};

export default function TrainigsTypeList({ onChange }: TrainigsTypeListProps): ReactElement | undefined {
  const additionalInfo = useAdditionalInfo();

  if (!additionalInfo) {
    return;
  }

  const typesList = additionalInfo.trainingType;

  function handleTypeChange(checkedItems: string[]) {
    console.log('TYPE CHECKED ITEMS: ', checkedItems);

    if(onChange) {
      onChange(checkedItems);
    }
  }

  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--type">
      <h4 className="gym-catalog-form__block-title">Тип</h4>
      <CheckboxList
        itemsList={typesList}
        listContainerClassName={CLASS_LIST.CHECKBOX_CONTAINER}
        listItemClassName={CLASS_LIST.CHECKBOX_ITEM}
        onChangeHandler={handleTypeChange}
      />
    </div>
  )
}
