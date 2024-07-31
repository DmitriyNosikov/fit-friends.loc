export default function OrdersSort() {
  return (
    <div className="sort-for">
      <p>Сортировать по:</p>
      <div className="sort-for__btn-container">
        <button className="btn-filter-sort" type="button"><span>Сумме</span>
          <svg width={16} height={10} aria-hidden="true">
            <use xlinkHref="#icon-sort-up" />
          </svg>
        </button>
        <button className="btn-filter-sort" type="button"><span>Количеству</span>
          <svg width={16} height={10} aria-hidden="true">
            <use xlinkHref="#icon-sort-down" />
          </svg>
        </button>
      </div>
    </div>
  )
}
