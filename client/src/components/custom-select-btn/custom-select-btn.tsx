import { ReactElement } from 'react';

type GenderSelectBtnProps = {
  itemsList: string[],
  uniqCSSId: string,
  onBtnClick?: Function,
  onItemSelect?: Function,
  onLeave?: Function,
  disabled?: boolean
}

export default function CustomSelectBtn({
  itemsList,
  uniqCSSId,
  onBtnClick,
  onItemSelect,
  onLeave,
  disabled
}: GenderSelectBtnProps): ReactElement {
  const customSelectListElem = document.querySelector(`#${uniqCSSId}`);
  const customSelectListContainer = customSelectListElem?.closest('.custom-select');
  const itemTextBox = customSelectListContainer?.querySelector('.custom-select__text');

  function handleBtnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    customSelectListContainer?.classList.toggle('custom-select--not-selected');
    customSelectListContainer?.classList.toggle('is-open');

    if(onBtnClick) {
      onBtnClick(e);
    }
  }

  function handleLocationBtnLeave(e: React.FocusEvent<HTMLButtonElement, Element>) {
    customSelectListContainer?.classList.add('custom-select--not-selected');
    customSelectListContainer?.classList.remove('is-open');

    if(onLeave) {
      onLeave(e);
    }
  }

  function handleLocationSelect(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const target = e.target as HTMLLIElement;
    const itemTextContent = target.textContent;

    if(!itemTextContent || !itemTextBox) {
      return;
    }

    // customSelectListContainer?.classList.add('not-empty');
    customSelectListContainer?.classList.remove('custom-select--not-selected');
    itemTextBox.textContent = itemTextContent;

    if(onItemSelect) {
      onItemSelect(itemTextContent)
    }
  }

  return (
    <>
      <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" onClick={handleBtnClick} onBlur={handleLocationBtnLeave} disabled={disabled}>
        <span className="custom-select__text"></span>
        <span className="custom-select__icon">
          <svg width={16} height={6} aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      <ul className="custom-select__list" role="listbox" id={uniqCSSId}>
        {
          itemsList && itemsList.map((item: string) => {
            return (
              <li className="custom-select__item" key={item} onClick={handleLocationSelect}>{item}</li>
            );
          })
        }
      </ul>
    </>
  )
}
