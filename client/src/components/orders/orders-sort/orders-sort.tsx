import { useState } from 'react';
import { OrdersSortType, OrdersSortTypeEnum, OrdersSortTypeList } from '@client/src/pages/orders/orders';

const DEFAULT_SORT_ORDER = 'DESC';

type OrdersSortProps = {
  sort: OrdersSortType
  onSortChange?: Function
}

export default function OrdersSort({ sort, onSortChange }: OrdersSortProps) {
  const [currentSort, setCurrentSort] = useState(sort);

  function handleSortChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = e.target as HTMLSpanElement;
    const sortType = target.closest('.btn-filter-sort')?.querySelector('span')?.id;

    if(!sortType) {
      return;
    }

    const newSort: OrdersSortType = {
      type: sortType as OrdersSortTypeList,
      order: getSortOrder(currentSort.order)
    };

    setCurrentSort(newSort)

    if (onSortChange) {
      onSortChange(newSort);
    }
  }

  function getSortOrder(currentOrder: string) {
    switch (currentOrder) {
      case 'DESC': return 'ASC';
      case 'ASC': return 'DESC';
      default: return DEFAULT_SORT_ORDER;
    }
  }

  return (
    <div className="sort-for" onChange={(e) => { }}>
      <p>Сортировать по:</p>
      <div className="sort-for__btn-container">
        <button className="btn-filter-sort" type="button" onClick={handleSortChange}>
          <span id={OrdersSortTypeEnum.TOTAL_PRICE}>Сумме</span>
          {
            (currentSort.type === OrdersSortTypeEnum.TOTAL_PRICE) && currentSort.order === 'DESC' &&
            <svg width={16} height={10} aria-hidden="true">
              <use xlinkHref="#icon-sort-up" />
            </svg>
          }

          {
            (currentSort.type === OrdersSortTypeEnum.TOTAL_PRICE) && currentSort.order === 'ASC' &&
            <svg width={16} height={10} aria-hidden="true">
              <use xlinkHref="#icon-sort-down" />
            </svg>
          }
        </button>
        <button className="btn-filter-sort" type="button" onClick={handleSortChange}>
          <span id={OrdersSortTypeEnum.TRAININGS_COUNT}>Количеству</span>
          {
            (currentSort.type === OrdersSortTypeEnum.TRAININGS_COUNT) && currentSort.order === 'DESC' &&
            <svg width={16} height={10} aria-hidden="true">
              <use xlinkHref="#icon-sort-up" />
            </svg>
          }

          {
            (currentSort.type === OrdersSortTypeEnum.TRAININGS_COUNT) && currentSort.order === 'ASC' &&
            <svg width={16} height={10} aria-hidden="true">
              <use xlinkHref="#icon-sort-down" />
            </svg>
          }
        </button>
      </div>
    </div>
  )
}
