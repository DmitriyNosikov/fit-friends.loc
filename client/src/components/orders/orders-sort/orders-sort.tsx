import { OrdersSortTypeEnum } from '../orders-list/orders-list';

type OrdersSortProps = {
  onSortChange?: Function
}

export default function OrdersSort({ onSortChange }: OrdersSortProps) {
  function handleSortChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = e.target as HTMLSpanElement;

    if(onSortChange) {
      onSortChange(target.id);
    }
  }

  return (
    <div className="sort-for" onChange={(e) => {}}>
      <p>Сортировать по:</p>
      <div className="sort-for__btn-container">
        <button className="btn-filter-sort" type="button" onClick={handleSortChange}>
          <span id={OrdersSortTypeEnum.TOTAL_PRICE}>Сумме</span>
          <svg width={16} height={10} aria-hidden="true">
            <use xlinkHref="#icon-sort-up" />
          </svg>
        </button>
        <button className="btn-filter-sort" type="button" onClick={handleSortChange}>
          <span id={OrdersSortTypeEnum.TRAININGS_COUNT}>Количеству</span>
          <svg width={16} height={10} aria-hidden="true">
            <use xlinkHref="#icon-sort-down" />
          </svg>
        </button>
      </div>
    </div>
  )
}
