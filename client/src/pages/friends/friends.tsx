import { ReactElement } from 'react';
import BackBtn from '@client/src/components/back-btn/back-btn';
import FriendsList from '@client/src/components/friends/friends-list/friends-list';

export default function Friends(): ReactElement {
  return (
    <section className="friends-list">
      <div className="container">
        <div className="friends-list__wrapper">

          <BackBtn />

          <div className="friends-list__title-wrapper">
            <h1 className="friends-list__title">Мои друзья</h1>
            {/*<div class="custom-toggle custom-toggle--switch custom-toggle--switch-right" data-validate-type="checkbox">
            <label>
              <input type="checkbox" value="user-agreement-1" name="user-agreement"><span class="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlink:href="#arrow-check"></use>
                </svg></span><span class="custom-toggle__label">Только онлайн</span>
            </label>
          </div>*/}
          </div>

          <FriendsList />
        </div>
      </div>
    </section>
  )
}
