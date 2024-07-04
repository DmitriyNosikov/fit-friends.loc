import { Location } from '@server/libs/types';

type RegistrationLocationProps = {
  locationList: Location[],
  onLocationCheck: Function
};

export default function RegistrationLocation({ locationList, onLocationCheck }: RegistrationLocationProps) {
  const locationListElem = document.querySelector('.custom-select__list');
  const locationListContainer = locationListElem?.closest('.custom-select');
  const locationTextBox = locationListContainer?.querySelector('.custom-select__text');

  function handleLocationBtnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    locationListContainer?.classList.toggle('custom-select--not-selected');
    locationListContainer?.classList.toggle('is-open');
  }

  function handleLocationBtnLeave(e: React.FocusEvent<HTMLDivElement, Element>) {
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
    <div className="custom-select custom-select--not-selected" onBlur={handleLocationBtnLeave}><span className="custom-select__label">Ваша локация</span>
      <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" onClick={handleLocationBtnClick}>
        <span className="custom-select__text"></span>
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      <ul className="custom-select__list" role="listbox">
        {
          locationList && locationList.map((locationItem: string) => {
            return (
              <li className="custom-select__item" key={locationItem} onClick={handleLocationSelect}>{locationItem}</li>
            );
          })
        }
      </ul>
    </div>
  )
}
