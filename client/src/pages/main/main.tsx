import SpecialOffers from '@client/src/components/special-offers/special-offers';
import SpecialForYou from '../../components/special-for-you/special-for-you';
import PopularTrainings from '@client/src/components/popular-trainings/popular-trainings';
import LookForCompany from '@client/src/components/look-for-company/look-for-company';

export default function Main() {
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
      <LookForCompany />
    </>

  );
};
