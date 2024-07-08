import SpecialOffers from '@client/src/components/special-offers/special-offers';
import SpecialForYou from '../../components/special-for-you/special-for-you';
import PopularTrainings from '@client/src/components/popular-trainings/popular-trainings';
import { useAppDispatch } from '@client/src/hooks';
import { useEffect } from 'react';
import { fetchConvenientTrainingsAction, fetchWithDiscountTrainingsAction, fetchWithRatingTrainingsAction } from '@client/src/store/actions/api-training-action';

export default function Main() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    // Загружаем данные для всех блоков только в случае, если пользователь авторизован
    if (isMounted) {
      dispatch(fetchConvenientTrainingsAction());
      dispatch(fetchWithDiscountTrainingsAction());
      dispatch(fetchWithRatingTrainingsAction);
    }

    return () => {
      isMounted = false;
    }
  }, [])


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
