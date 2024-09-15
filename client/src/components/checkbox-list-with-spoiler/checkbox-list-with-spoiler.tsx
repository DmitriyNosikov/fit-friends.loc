import { debounce, upperCaseFirst } from '@client/src/utils/common'
import classNames from 'classnames'
import { useState } from 'react';

type CheckboxListWithSpoilerProps = {
  title: string,
  items: string[],
  maxShowedItemsCount: number,

  checkboxesName: string,

  containerClass: string,

  titleClass?: string,
  listClass?: string,
  listItemClass?: string,
  showMoreBtnClass?: string,

  onChange?: Function
}

const CHANGE_SELECTION_TIMEOUT = 800;

export default function CheckboxListWithSpoiler({
  title,
  items,
  maxShowedItemsCount,

  checkboxesName,

  titleClass,
  containerClass,
  listClass,
  listItemClass,
  showMoreBtnClass,

  onChange
}: CheckboxListWithSpoilerProps) {
  const hiddenListContainer = document.querySelector(`.${containerClass.split(' ').join('.')} .spoiler-container__hidden-list`);
  const hiddenClassName = 'visually-hidden';

  const [isListHidden, setIsListHidden] = useState(true);

  const showMoreBtnText = isListHidden ? 'Посмотреть все' : 'Скрыть';

  let slicedItems = null;
  let allItems = null;

  if (items.length > maxShowedItemsCount) {
    allItems = items.slice(0, maxShowedItemsCount);
    slicedItems = items.slice(maxShowedItemsCount);
  } else {
    allItems = items;
  }

  const debouncedChangeSelectionHandler = debounce(handleChangeSelection, CHANGE_SELECTION_TIMEOUT);

  function handleChangeSelection(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    if (!target || !onChange) {
      return;
    }


    const checkedCheckboxes: NodeListOf<HTMLInputElement> | undefined = target
      .closest('.spoiler-container__list')
      ?.querySelectorAll('input[type="checkbox"]:checked');

    if(!checkedCheckboxes) {
      return [];
    }

    const checkedItems: string[] = [];

    checkedCheckboxes.forEach((checkbox) => {
      if ('value' in checkbox) {
        checkedItems.push(checkbox.value);
      }
    });

    onChange(checkedItems);
  }

  function handleShowMoreBtnClick() {
    if (!hiddenListContainer) {
      return;
    }

    if (hiddenListContainer.classList.contains(hiddenClassName)) {
      hiddenListContainer.classList.remove(hiddenClassName);
      setIsListHidden(false);
    } else {
      hiddenListContainer.classList.add(hiddenClassName);
      setIsListHidden(true);
    }
  }

  return (
    <div className={`spoiler-container ${containerClass}`}>
      <h4 className={classNames(
        'spoiler-container__title',
        { titleClass }
      )}>{title}</h4>
      <ul className={`spoiler-container__list ${listClass}`} onChange={debouncedChangeSelectionHandler}>
        {
          allItems.map((item) => (
            <li className={`spoiler-container__list-item ${listItemClass}`} key={item}>
              <div className="custom-toggle custom-toggle--checkbox">
                <label>
                  <input type="checkbox" defaultValue={item} name={checkboxesName} />
                  <span className="custom-toggle__icon">
                    <svg width={9} height={6} aria-hidden="true">
                      <use xlinkHref="#arrow-check" />
                    </svg>
                  </span>
                  <span className="custom-toggle__label">{upperCaseFirst(item)}</span>
                </label>
              </div>
            </li>
          ))
        }

        {
          slicedItems &&
          <div className={classNames(
            'spoiler-container__hidden-list',
            { 'visually-hidden': isListHidden }
          )}>
            {
              slicedItems.map((hiddenItem) => (
                <li className={`spoiler-container__list-item ${listItemClass}`} key={hiddenItem}>
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input type="checkbox" defaultValue={hiddenItem} name={checkboxesName} />
                      <span className="custom-toggle__icon">
                        <svg width={9} height={6} aria-hidden="true">
                          <use xlinkHref="#arrow-check" />
                        </svg>
                      </span>
                      <span className="custom-toggle__label">{upperCaseFirst(hiddenItem)}</span>
                    </label>
                  </div>
                </li>
              ))
            }
          </div>
        }
      </ul>
      <button className={classNames(
        `spoiler-container__show-more-btn btn-show-more ${showMoreBtnClass}`,
        { 'spoiler-container__show-more-btn--showed': !isListHidden }
      )} type="button" onClick={handleShowMoreBtnClick}>
        <span>{ showMoreBtnText }</span>
        <svg className="btn-show-more__icon" width={10} height={4} aria-hidden="true">
          <use xlinkHref="#arrow-down" />
        </svg>
      </button>
    </div>
  )
}
