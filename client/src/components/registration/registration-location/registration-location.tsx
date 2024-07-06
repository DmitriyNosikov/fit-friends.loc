import { Location } from '@server/libs/types';
import CustomSelectBtn from '../../custom-select-btn/custom-select-btn';

type RegistrationLocationProps = {
  locationList: Location[],
  onLocationCheck: Function
};

export default function RegistrationLocation({ locationList, onLocationCheck }: RegistrationLocationProps) {
  const locationListElem = document.querySelector('.custom-select__list');
  const locationListContainer = locationListElem?.closest('.custom-select');
  const locationTextBox = locationListContainer?.querySelector('.custom-select__text');

  function handleLocationBtnClick() {
    locationListContainer?.classList.toggle('custom-select--not-selected');
    locationListContainer?.classList.toggle('is-open');
  }

  function handleLocationBtnLeave() {
    locationListContainer?.classList.add('custom-select--not-selected');
    locationListContainer?.classList.remove('is-open');
  }

  function handleLocationSelect(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const target = e.target as HTMLLIElement;
    const location = target.textContent;

    if(!location || !locationTextBox) {
      return;
    }

    locationListContainer?.classList.add('not-empty');
    locationListContainer?.classList.remove('custom-select--not-selected');
    locationTextBox.textContent = location;

    onLocationCheck(location);
  }


  return (
    <div className="custom-select custom-select--not-selected" onBlur={handleLocationBtnLeave} id="location">
      <span className="custom-select__label">Ваша локация</span>

      <CustomSelectBtn
        itemsList={locationList}
        onBtnClick={handleLocationBtnClick}
        onItemSelect={handleLocationSelect}
      />

      <span className="custom-input__error"></span>
    </div>
  )
}
