import { upperCaseFirst } from '@client/src/utils/common';
import { Gender } from '@server/libs/types'

type RegistrationGenderProps = {
  genderList: Gender[],
  onGenderChange: Function
}

export default function RegistrationGender({ genderList, onGenderChange }: RegistrationGenderProps) {
  // Gender
  function handleChangeGender(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    onGenderChange(target.value);
  }

  return (
    <div className="sign-up__radio" id="gender">
      <span className="sign-up__label">Пол</span>
      <div className="custom-toggle-radio custom-toggle-radio--big">
        {
          genderList.map((genderItem: string) => {
            const isSelected = (genderItem === 'женский');

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
      <span className="custom-input__error"></span>
    </div>
  )
}
