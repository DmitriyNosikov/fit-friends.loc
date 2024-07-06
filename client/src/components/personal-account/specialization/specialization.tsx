import { upperCaseFirst } from '@client/src/utils/common';
import { TrainingType } from '@shared/types/training-type.enum';
import { ReactElement } from 'react';

type SpecializationProps = {
  trainingTypeList: TrainingType[],
  usersTrainingType: TrainingType[]
  formEditable: boolean
};

export default function Specialization({ trainingTypeList, usersTrainingType, formEditable }: SpecializationProps): ReactElement {
  return (
    <div className="user-info__section">
      <h2 className="user-info__title user-info__title--specialization">Специализация</h2>
      <div className="specialization-checkbox user-info__specialization">
        {
          trainingTypeList.map((type) => {
            const isChecked = usersTrainingType.includes(type);

            return (
              <div className="btn-checkbox" key={type}>
                <label>
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    name="specialization"
                    defaultValue={type}
                    defaultChecked={isChecked}
                    disabled={!formEditable}
                  />
                  <span className="btn-checkbox__btn">{upperCaseFirst(type)}</span>
                </label>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
