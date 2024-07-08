import SpecialOffers from '@client/src/components/special-offers/special-offers';
import SpecialForYou from '../../components/special-for-you/special-for-you';
import PopularTrainings from '@client/src/components/popular-trainings/popular-trainings';

import useConvenientTrainingsList from '@client/src/hooks/useConvenientTrainingsList';
import useWithDiscountTrainingsList from '@client/src/hooks/useWithDiscountTrainingsList';
import useWithRatingTrainingsList from '@client/src/hooks/useWithRatingTrainingsList';

export default function Main() {
  // TODO: Возможно, стоит вынести все в отдельный юзэффект
  // и передавать список в каждый конкретный компонент.
  // Возможно это поможет поборот 3 доп. перерисовки (9 запросов, по 3 на каждый компонент ниже)
  useConvenientTrainingsList();
  useWithDiscountTrainingsList()
  useWithRatingTrainingsList()

  return (
    <>
      <h1 className="visually-hidden">
        FitFriends — Время находить тренировки, спортзалы и друзей спортсменов
      </h1>

      {/* Тренировки, подобранные под пользователя */}
      <SpecialForYou />

      {/* Специальные предложения */}
      <SpecialOffers />

      {/* Популярные тренировки */}
      <PopularTrainings />

      {/* Ищут компанию для тренировки (на текущий момент не активно) */}
      {/* <LookForCompany /> */}
    </>

  );
};
