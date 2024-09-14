import { ReactElement } from 'react';

export default function UsersList(): ReactElement {
  return (
    <div className="inner-page__content">
      <div className="users-catalog">
        <ul className="users-catalog__list">
          <li className="users-catalog__item">
            <div className="thumbnail-user thumbnail-user--role-user">
              <div className="thumbnail-user__image">
                <picture>
                  <source type="image/webp" srcSet="img/content/thumbnails/user-01.webp, img/content/thumbnails/user-01@2x.webp 2x" /><img src="img/content/thumbnails/user-01.jpg" srcSet="img/content/thumbnails/user-01@2x.jpg 2x" width={82} height={82} />
                </picture>
              </div>
              <div className="thumbnail-user__header">
                <h3 className="thumbnail-user__name">Елизавета</h3>
                <div className="thumbnail-user__location">
                  <svg width={14} height={16} aria-hidden="true">
                    <use xlinkHref="#icon-location" />
                  </svg>
                  <address className="thumbnail-user__location-address">Петроградская</address>
                </div>
              </div>
              <ul className="thumbnail-user__hashtags-list">
                <li className="thumbnail-user__hashtags-item">
                  <div className="hashtag thumbnail-user__hashtag"><span>#стретчинг</span></div>
                </li>
                <li className="thumbnail-user__hashtags-item">
                  <div className="hashtag thumbnail-user__hashtag"><span>#йога</span></div>
                </li>
              </ul>
              <a className="btn btn--medium thumbnail-user__button" href="#">Подробнее</a>
            </div>
          </li>
          <li className="users-catalog__item">
            <div className="thumbnail-user thumbnail-user--role-coach">
              <div className="thumbnail-user__image">
                <picture>
                  <source type="image/webp" srcSet="img/content/thumbnails/user-02.webp, img/content/thumbnails/user-02@2x.webp 2x" /><img src="img/content/thumbnails/user-02.jpg" srcSet="img/content/thumbnails/user-02@2x.jpg 2x" width={82} height={82} />
                </picture>
              </div>
              <div className="thumbnail-user__header">
                <h3 className="thumbnail-user__name">Дарья</h3>
                <div className="thumbnail-user__location">
                  <svg width={14} height={16} aria-hidden="true">
                    <use xlinkHref="#icon-location" />
                  </svg>
                  <address className="thumbnail-user__location-address">Адмиралтейская</address>
                </div>
              </div>
              <ul className="thumbnail-user__hashtags-list">
                <li className="thumbnail-user__hashtags-item">
                  <div className="hashtag thumbnail-user__hashtag"><span>#стретчинг</span></div>
                </li>
              </ul>
              <a className="btn btn--dark-bg btn--medium thumbnail-user__button" href="#">Подробнее</a>
            </div>
          </li>
          <li className="users-catalog__item">
            <div className="thumbnail-user thumbnail-user--role-coach">
              <div className="thumbnail-user__image">
                <picture>
                  <source type="image/webp" srcSet="img/content/thumbnails/user-03.webp, img/content/thumbnails/user-03@2x.webp 2x" /><img src="img/content/thumbnails/user-03.jpg" srcSet="img/content/thumbnails/user-03@2x.jpg 2x" width={82} height={82} />
                </picture>
              </div>
              <div className="thumbnail-user__header">
                <h3 className="thumbnail-user__name">Наталья</h3>
                <div className="thumbnail-user__location">
                  <svg width={14} height={16} aria-hidden="true">
                    <use xlinkHref="#icon-location" />
                  </svg>
                  <address className="thumbnail-user__location-address">Василеостровская</address>
                </div>
              </div>
              <ul className="thumbnail-user__hashtags-list">
                <li className="thumbnail-user__hashtags-item">
                  <div className="hashtag thumbnail-user__hashtag"><span>#пилатес</span></div>
                </li>
              </ul>
              <a className="btn btn--dark-bg btn--medium thumbnail-user__button" href="#">Подробнее</a>
            </div>
          </li>
        </ul>

        <div className="show-more users-catalog__show-more">
          <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
          <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
        </div>
      </div>
    </div>
  )
}
