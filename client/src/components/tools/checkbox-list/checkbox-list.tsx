import { ReactElement } from 'react';

const CHANGE_LIST_TIMEOUT = 800;

type CheckboxListProps = {
  itemsList: string[],
  listContainerClassName?: string,
  listItemClassName?: string,

  onChangeHandler?: Function
  itemModifier?: Function
}

export default function CheckboxList({
  itemsList,
  listContainerClassName,
  listItemClassName,
  onChangeHandler,
  itemModifier
}: CheckboxListProps): ReactElement {

  const listContainer = document.querySelector('.checkboxes-list');
  let changeTimer: NodeJS.Timeout | null = null;

  function handleListChange(e: React.FormEvent<HTMLUListElement>) {
    const target = e.target;

    if ('type' in target && target.type !== 'checkbox') {
      return;
    }

    if (changeTimer) {
      clearTimeout(changeTimer);
    }

    changeTimer = setTimeout(() => {
      const checkedCheckboxes: NodeListOf<HTMLInputElement> | undefined = listContainer?.querySelectorAll('input[type="checkbox"]:checked');

      if (onChangeHandler && checkedCheckboxes) {
        const checkedItems: string[] = [];

        checkedCheckboxes.forEach((checkbox) => {
          if ('value' in checkbox) {
            checkedItems.push(checkbox.value);
          }
        });

        onChangeHandler(checkedItems);
      }
    }, CHANGE_LIST_TIMEOUT)
  }

  return (
    <ul className={`checkboxes-list ${listContainerClassName}`} onChange={handleListChange}>
      {
        itemsList.map((item) => {
          return (
            <li className={`checkboxes-list__item ${listItemClassName}`} key={item}>
              <div className="custom-toggle custom-toggle--checkbox">
                <label>
                  <input type="checkbox" defaultValue={item} name="type" />
                  <span className="custom-toggle__icon">
                    <svg width={9} height={6} aria-hidden="true">
                      <use xlinkHref="#arrow-check" />
                    </svg>
                  </span>
                  <span className="custom-toggle__label">{(itemModifier) ? itemModifier(item) : item}</span>
                </label>
              </div>
            </li>
          )
        })
      }
    </ul>
  )
}
