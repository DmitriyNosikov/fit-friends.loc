import { ITEMS_PER_PAGE } from '@client/src/const';

import Stub from '../../tools/stub/stub';
import PurchasesListItem from '../purchases-list-item/purchases-list-item';

import { useAppDispatch } from '@client/src/hooks';
import useSearchBalance from '@client/src/hooks/useSearchBalance';
import { CreateBalanceRDO } from '@shared/balance';
import { BaseSearchQuery } from '@shared/types';
import { searchBalanceAction } from '@client/src/store/actions/api-balance-action';

const START_PAGE = 1;

type PurchasesListProps = {
  showOnlyActive?: boolean;
}


export default function PurchasesList({ showOnlyActive }: PurchasesListProps) {
  let searchQuery: BaseSearchQuery = {
    page: START_PAGE,
    limit: ITEMS_PER_PAGE
  };

  const dispatch = useAppDispatch();
  const purchases = useSearchBalance(searchQuery);
  const purchasesEntities = purchases?.entities;
  const filteredPurchases = (showOnlyActive && purchasesEntities)
    ? [...purchasesEntities].filter((purchase: CreateBalanceRDO) => purchase.remainingTrainingsCount > 0)
    : purchasesEntities;

  if (!filteredPurchases || filteredPurchases.length <= 0) {
    return <Stub />
  }

  const isShowMoreBtnVisible = purchases?.totalPages
    && purchases?.totalPages > START_PAGE
    && purchases.currentPage !== purchases?.totalPages;

  function handleShowMoreBtnClick() {
    if (!purchases || !purchases.currentPage) {
      return;
    };

    let currentPage = purchases.currentPage;

    searchQuery = {
      page: ++currentPage,
      limit: ITEMS_PER_PAGE
    };

    dispatch(searchBalanceAction({ searchQuery, appendItems: true }));
  }

  function handleBackToBeginBtnClick() {
    searchQuery = {
      page: START_PAGE,
      limit: ITEMS_PER_PAGE
    };

    dispatch(searchBalanceAction({ searchQuery }));
  }

  return (
    <>
      <ul className="my-purchases__list">
        {
          filteredPurchases && filteredPurchases.map((purchase) => <PurchasesListItem purchase={purchase} key={purchase.id} />)
        }
      </ul>

      <div className="show-more my-purchases__show-more">
        {
          isShowMoreBtnVisible &&
          <button className="btn show-more__button show-more__button--more" type="button" onClick={handleShowMoreBtnClick}>Показать еще</button>
        }

        {
          filteredPurchases.length > ITEMS_PER_PAGE &&
          <button className="btn show-more__button show-more__button--to-top" type="button" onClick={handleBackToBeginBtnClick}>Вернуться в начало</button>
        }
      </div>
    </>
  )
}
