import { Location } from '@server/libs/types';
import { MouseEventHandler, ReactElement } from 'react';

type LocationSelectBtnProps = {
  locationList: Location[],
  onBtnClick: MouseEventHandler<HTMLButtonElement>,
  onLocationSelect: MouseEventHandler<HTMLLIElement>,
}

export default function LocationSelectBtn({ locationList, onBtnClick, onLocationSelect }: LocationSelectBtnProps): ReactElement {
  return (
    <>
      <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" onClick={onBtnClick}>
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
              <li className="custom-select__item" key={locationItem} onClick={onLocationSelect}>{locationItem}</li>
            );
          })
        }
      </ul>
    </>
  )
}
