import { ReactElement } from 'react';
import LookForCompanyItem from '../look-for-company-item/look-for-company-item';

export default function LookForCompany(): ReactElement {
  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">
              Ищут компанию для тренировки
            </h2>
            <button
              className="btn-flat btn-flat--light look-for-company__button"
              type="button"
            >
              <span>Смотреть все</span>
              <svg width={14} height={10} aria-hidden="true">
                <use xlinkHref="#arrow-right" />
              </svg>
            </button>
            <div className="look-for-company__controls">
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="previous"
              >
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#arrow-left" />
                </svg>
              </button>
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="next"
              >
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#arrow-right" />
                </svg>
              </button>
            </div>
          </div>
          <ul className="look-for-company__list">
            {
              [
                {
                  avatar: 'img/content/thumbnails/user-04.jpg',
                  name: 'Диана',
                  location: 'Невский проспект',
                  trainingType: 'пилатес'
                },
                {
                  avatar: 'img/content/thumbnails/user-05.jpg',
                  name: 'Константин',
                  location: 'Комендантский проспект',
                  trainingType: 'силовые'
                },
                {
                  avatar: 'img/content/thumbnails/user-06.jpg',
                  name: 'Иван',
                  location: 'Чёрная речка',
                  trainingType: 'бег'
                },
                {
                  avatar: 'img/content/thumbnails/user-07.jpg',
                  name: 'Яна',
                  location: 'Крестовский остров',
                  trainingType: 'пилатес'
                },
              ].map((item) => {
                return <LookForCompanyItem user={item} key={item.avatar} />
              })
            }
          </ul>
        </div>
      </div>
    </section>
  );
}
