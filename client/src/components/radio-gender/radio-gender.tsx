import { upperCaseFirst } from '@client/src/utils/common';

type RadioGenderProps = {
  genderList: string[],
  onGenderChange: Function,
  selectedItem?: string,
  containerAdditionalClass?: string
}

export default function RadioGender({ genderList, onGenderChange, selectedItem, containerAdditionalClass }: RadioGenderProps) {
  // Gender
  function handleChangeGender(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    onGenderChange(target.value);
  }

  return (
    <div className={`custom-toggle-radio ${containerAdditionalClass}`}>
      {
        genderList.map((genderItem: string) => {
          const isSelected = (genderItem === selectedItem);

          return (
            <div className="custom-toggle-radio__block" key={genderItem}>
              <label>
                <input type="radio" name="sex" defaultValue={genderItem}  defaultChecked={isSelected} onChange={handleChangeGender}/>
                <span className="custom-toggle-radio__icon"></span>
                <span className="custom-toggle-radio__label">{upperCaseFirst(genderItem)}</span>
                <span className="custom-input__error"></span>
              </label>
            </div>
          );
        })
      }
    </div>
  )
}
