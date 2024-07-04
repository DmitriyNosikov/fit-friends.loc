import { UserRole } from '@server/libs/types';

type RegistrationRoleProps = {
  roles: UserRole[],
  onRoleChangeHandler: Function
};

export default function RegistrationRole({ roles, onRoleChangeHandler }: RegistrationRoleProps) {
  const btnRoles = ['client', 'trainer'];

  function handleRoleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    onRoleChangeHandler(target.value);
  }

  return (
    <div className="sign-up__role" id="role">
      <h2 className="sign-up__legend">Выберите роль</h2>
      <div className="role-selector sign-up__role-selector">
        {
          roles && roles.map((role) => {
            if(!btnRoles.includes(role)) {
              return;
            }

            const roleBtnText = (role === 'client') ? 'Я хочу тренироваться' : 'Я хочу тренировать';
            const isChecked = (role === 'client');

            return (
              <div className="role-btn" key={role}>
                <label>
                  <input
                    className="visually-hidden"
                    type="radio"
                    name="role"
                    defaultValue={role}
                    defaultChecked={isChecked}
                    onChange={handleRoleChange}
                  />
                  <span className="role-btn__icon">
                    <svg width="12" height="13" aria-hidden="true">
                      <use xlinkHref="#icon-weight"></use>
                    </svg>
                  </span>
                  <span className="role-btn__btn">{roleBtnText}</span>
                </label>
              </div>
            )
          })
        }
      </div>
      <span className="custom-input__error"></span>
    </div>
  )
}
