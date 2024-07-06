import SpecialOffers from '@client/src/components/special-offers/special-offers';
import SpecialForYou from '../../components/special-for-you/special-for-you';
import PopularTrainings from '@client/src/components/popular-trainings/popular-trainings';

import useWithRatingTrainingsList from '@client/src/hooks/useWithRatingTrainingsList';
import useWithDiscountTrainingsList from '@client/src/hooks/useWithDiscountTrainingsList';
import useConvenientTrainingsList from '@client/src/hooks/useConvenientTrainingsList';

export default function Main() {
  // Загружаем данные для всех блоков
  useConvenientTrainingsList();
  useWithDiscountTrainingsList();
  useWithRatingTrainingsList();

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
