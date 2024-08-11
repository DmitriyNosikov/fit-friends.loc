import { ReactElement } from 'react';

export default function PersonalCardTrainer(): ReactElement {
  return (
    <section className="user-card-coach">
      <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
      <div className="user-card-coach__wrapper">
        <div className="user-card-coach__card">
          <div className="user-card-coach__content">
            <div className="user-card-coach__head">
              <h2 className="user-card-coach__title">Валерия</h2>
            </div>
            <div className="user-card-coach__label">
              <a href="popup-user-map.html"><svg className="user-card-coach__icon-location" width={12} height={14} aria-hidden="true">
                <use xlinkHref="#icon-location" />
              </svg><span>Адмиралтейская</span></a>
            </div>
            <div className="user-card-coach__status-container">
              <div className="user-card-coach__status user-card-coach__status--tag">
                <svg className="user-card-coach__icon-cup" width={12} height={13} aria-hidden="true">
                  <use xlinkHref="#icon-cup" />
                </svg><span>Тренер</span>
              </div>
              <div className="user-card-coach__status user-card-coach__status--check"><span>Готов тренировать</span></div>
            </div>
            <div className="user-card-coach__text">
              <p>Привет! Меня зовут Иванова Валерия, мне 34 года. Я&nbsp;профессиональный тренер по&nbsp;боксу. Не&nbsp;боюсь пробовать новое, также увлекаюсь кроссфитом, йогой и&nbsp;силовыми тренировками.</p>
              <p>Провожу как индивидуальные тренировки, так и&nbsp;групповые занятия. Помогу вам достигнуть своей цели и&nbsp;сделать это с&nbsp;удовольствием!</p>
            </div>
            <button className="btn-flat user-card-coach__sertificate" type="button">
              <svg width={12} height={13} aria-hidden="true">
                <use xlinkHref="#icon-teacher" />
              </svg><span>Посмотреть сертификаты</span>
            </button>
            <ul className="user-card-coach__hashtag-list">
              <li className="user-card-coach__hashtag-item">
                <div className="hashtag"><span>#бокс</span></div>
              </li>
              <li className="user-card-coach__hashtag-item">
                <div className="hashtag"><span>#кроссфит</span></div>
              </li>
              <li className="user-card-coach__hashtag-item">
                <div className="hashtag"><span>#силовые</span></div>
              </li>
              <li className="user-card-coach__hashtag-item">
                <div className="hashtag"><span>#йога</span></div>
              </li>
            </ul>
            <button className="btn user-card-coach__btn" type="button">Добавить в друзья</button>
          </div>
          <div className="user-card-coach__gallary">
            <ul className="user-card-coach__gallary-list">
              <li className="user-card-coach__gallary-item"><img src="img/content/user-coach-photo1.jpg" srcSet="img/content/user-coach-photo1@2x.jpg 2x" width={334} height={573} alt="photo1" />
              </li>
              <li className="user-card-coach__gallary-item"><img src="img/content/user-coach-photo2.jpg" srcSet="img/content/user-coach-photo2@2x.jpg 2x" width={334} height={573} alt="photo2" />
              </li>
            </ul>
          </div>
        </div>
        <div className="user-card-coach__training">
          <div className="user-card-coach__training-head">
            <h2 className="user-card-coach__training-title">Тренировки</h2>
            <div className="user-card-coach__training-bts">
              <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="back">
                <svg width={14} height={10} aria-hidden="true">
                  <use xlinkHref="#arrow-left" />
                </svg>
              </button>
              <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="next">
                <svg width={14} height={10} aria-hidden="true">
                  <use xlinkHref="#arrow-right" />
                </svg>
              </button>
            </div>
          </div>
          <ul className="user-card-coach__training-list">
            <li className="user-card-coach__training-item">
              <div className="thumbnail-training">
                <div className="thumbnail-training__inner">
                  <div className="thumbnail-training__image">
                    <picture>
                      <source type="image/webp" srcSet="img/content/user-card-coach/training-1.webp, img/content/user-card-coach/training-1@2x.webp 2x" />
                      <img src="img/content/user-card-coach/training-1.jpg" srcSet="img/content/user-card-coach/training-1@2x.jpg 2x" width={330} height={190} />
                    </picture>
                  </div>
                  <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">1200</span><span>₽</span>
                  </p>
                  <h3 className="thumbnail-training__title">Power</h3>
                  <div className="thumbnail-training__info">
                    <ul className="thumbnail-training__hashtags-list">
                      <li className="thumbnail-training__hashtags-item">
                        <div className="hashtag thumbnail-training__hashtag"><span>#силовые</span></div>
                      </li>
                      <li className="thumbnail-training__hashtags-item">
                        <div className="hashtag thumbnail-training__hashtag"><span>#600ккал</span></div>
                      </li>
                    </ul>
                    <div className="thumbnail-training__rate">
                      <svg width={16} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-star" />
                      </svg><span className="thumbnail-training__rate-value">4</span>
                    </div>
                  </div>
                  <div className="thumbnail-training__text-wrapper">
                    <p className="thumbnail-training__text">Тренировка на отработку правильной техники работы с тяжелыми весами, укрепления мышц кора и спины.</p>
                  </div>
                  <div className="thumbnail-training__button-wrapper">
                    <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                    <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                  </div>
                </div>
              </div>
            </li>
            <li className="user-card-coach__training-item">
              <div className="thumbnail-training">
                <div className="thumbnail-training__inner">
                  <div className="thumbnail-training__image">
                    <picture>
                      <source type="image/webp" srcSet="img/content/user-card-coach/training-2.webp, img/content/user-card-coach/training-2@2x.webp 2x" />
                      <img src="img/content/user-card-coach/training-2.jpg" srcSet="img/content/user-card-coach/training-2@2x.jpg 2x" width={330} height={190} />
                    </picture>
                  </div>
                  <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">2200</span><span>₽</span>
                  </p>
                  <h3 className="thumbnail-training__title">Devil's Cindy</h3>
                  <div className="thumbnail-training__info">
                    <ul className="thumbnail-training__hashtags-list">
                      <li className="thumbnail-training__hashtags-item">
                        <div className="hashtag thumbnail-training__hashtag"><span>#кроссфит</span></div>
                      </li>
                      <li className="thumbnail-training__hashtags-item">
                        <div className="hashtag thumbnail-training__hashtag"><span>#950ккал</span></div>
                      </li>
                    </ul>
                    <div className="thumbnail-training__rate">
                      <svg width={16} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-star" />
                      </svg><span className="thumbnail-training__rate-value">5</span>
                    </div>
                  </div>
                  <div className="thumbnail-training__text-wrapper">
                    <p className="thumbnail-training__text">Знаменитый кроссфит комплекс. Синди – универсальная тренировка для развития функциональной силы.</p>
                  </div>
                  <div className="thumbnail-training__button-wrapper">
                    <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                    <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                  </div>
                </div>
              </div>
            </li>
            <li className="user-card-coach__training-item">
              <div className="thumbnail-training">
                <div className="thumbnail-training__inner">
                  <div className="thumbnail-training__image">
                    <picture>
                      <source type="image/webp" srcSet="img/content/user-card-coach/training-3.webp, img/content/user-card-coach/training-3@2x.webp 2x" />
                      <img src="img/content/user-card-coach/training-3.jpg" srcSet="img/content/user-card-coach/training-3@2x.jpg 2x" width={330} height={190} />
                    </picture>
                  </div>
                  <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">1000</span><span>₽</span>
                  </p>
                  <h3 className="thumbnail-training__title">boxing</h3>
                  <div className="thumbnail-training__info">
                    <ul className="thumbnail-training__hashtags-list">
                      <li className="thumbnail-training__hashtags-item">
                        <div className="hashtag thumbnail-training__hashtag"><span>#бокс</span></div>
                      </li>
                      <li className="thumbnail-training__hashtags-item">
                        <div className="hashtag thumbnail-training__hashtag"><span>#800ккал</span></div>
                      </li>
                    </ul>
                    <div className="thumbnail-training__rate">
                      <svg width={16} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-star" />
                      </svg><span className="thumbnail-training__rate-value">5</span>
                    </div>
                  </div>
                  <div className="thumbnail-training__text-wrapper">
                    <p className="thumbnail-training__text">Тренировка на отработку правильных ударов, координации и оптимальной механики защитных движений.</p>
                  </div>
                  <div className="thumbnail-training__button-wrapper">
                    <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                    <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                  </div>
                </div>
              </div>
            </li>
            <li className="user-card-coach__training-item">
              <div className="thumbnail-training">
                <div className="thumbnail-training__inner">
                  <div className="thumbnail-training__image">
                    <picture>
                      <source type="image/webp" srcSet="img/content/user-card-coach/training-4.webp, img/content/user-card-coach/training-4@2x.webp 2x" />
                      <img src="img/content/user-card-coach/training-4.jpg" srcSet="img/content/user-card-coach/training-4@2x.jpg 2x" width={330} height={190} />
                    </picture>
                  </div>
                  <p className="thumbnail-training__price">Бесплатно
                  </p>
                  <h3 className="thumbnail-training__title">Crossfit</h3>
                  <div className="thumbnail-training__info">
                    <ul className="thumbnail-training__hashtags-list">
                      <li className="thumbnail-training__hashtags-item">
                        <div className="hashtag thumbnail-training__hashtag"><span>#кроссфит</span></div>
                      </li>
                      <li className="thumbnail-training__hashtags-item">
                        <div className="hashtag thumbnail-training__hashtag"><span>#1200ккал</span></div>
                      </li>
                    </ul>
                    <div className="thumbnail-training__rate">
                      <svg width={16} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-star" />
                      </svg><span className="thumbnail-training__rate-value">5</span>
                    </div>
                  </div>
                  <div className="thumbnail-training__text-wrapper">
                    <p className="thumbnail-training__text">Сложный комплекс упражнений для профессиональных атлетов на отработку показателей в классическом стиле.</p>
                  </div>
                  <div className="thumbnail-training__button-wrapper">
                    <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                    <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <form className="user-card-coach__training-form">
            <button className="btn user-card-coach__btn-training" type="button">Хочу персональную тренировку</button>
            <div className="user-card-coach__training-check">
              <div className="custom-toggle custom-toggle--checkbox">
                <label>
                  <input type="checkbox" defaultValue="user-agreement-1" name="user-agreement" defaultChecked /><span className="custom-toggle__icon">
                    <svg width={9} height={6} aria-hidden="true">
                      <use xlinkHref="#arrow-check" />
                    </svg></span><span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
