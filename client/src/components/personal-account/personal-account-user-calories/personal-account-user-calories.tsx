import { useAppDispatch } from '@client/src/hooks';
import { updateUserAction } from '@client/src/store/actions/api-user-action';
import { LoggedUserRDO } from '@shared/user';
import { ReactElement } from 'react';

const CALORIES_CHANGE_TIMEOUT = 800;

type PersonalAccountUserCalories = {
  userInfo: LoggedUserRDO
}

export default function PersonalAccountUserCalories({ userInfo }: PersonalAccountUserCalories): ReactElement {
  const dispatch = useAppDispatch();

  const { dayCaloriesLimit, loseCaloriesLimit } = userInfo;
  const weekCaloriesInput = document.querySelector('#personal-account-user__input_week-calories') as HTMLInputElement;

  let dayCaloriesChangeTimer: NodeJS.Timeout | null = null;
  let weekCaloriesChangeTimer: NodeJS.Timeout | null = null;

  function onDayCaloriesChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const newDayCalories = parseInt(target.value);

    if (dayCaloriesChangeTimer) {
      clearTimeout(dayCaloriesChangeTimer);
    }

    if (newDayCalories && newDayCalories !== dayCaloriesLimit) {
      dayCaloriesChangeTimer = setTimeout(() => {
        dispatch(updateUserAction({ dayCaloriesLimit: newDayCalories }));
      }, CALORIES_CHANGE_TIMEOUT);

      if(!weekCaloriesInput) {
        return;
      }

      weekCaloriesInput.value = newDayCalories ? String(newDayCalories * 7) : '0';
    }
  }

  function onWeekCaloriesChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const newWeekCalories = parseInt(target.value);

    if (weekCaloriesChangeTimer) {
      clearTimeout(weekCaloriesChangeTimer);
    }

    if (newWeekCalories && newWeekCalories !== loseCaloriesLimit) {
      weekCaloriesChangeTimer = setTimeout(() => {
        dispatch(updateUserAction({ loseCaloriesLimit: newWeekCalories }));
      }, CALORIES_CHANGE_TIMEOUT);
    }
  }

  return (
    <div className="personal-account-user__schedule">
      <form action="#" method="get">
        <div className="personal-account-user__form">
          <div className="personal-account-user__input">
            <label>
              <span className="personal-account-user__label">План на день, ккал</span>
              <input
                id="personal-account-user__input_day-calories"
                type="text"
                name="schedule-for-the-day"
                defaultValue={`${dayCaloriesLimit ?? 0}`}
                onChange={onDayCaloriesChangeHandler}
              />
            </label>
          </div>
          <div className="personal-account-user__input">
            <label>
              <span className="personal-account-user__label">План на неделю, ккал</span>
              <input
                id="personal-account-user__input_week-calories"
                type="text"
                name="schedule-for-the-week"
                defaultValue={dayCaloriesLimit * 7}
                onChange={onWeekCaloriesChangeHandler}
                disabled
              />
            </label>
          </div>

        </div>
      </form>
    </div>
  )
}
