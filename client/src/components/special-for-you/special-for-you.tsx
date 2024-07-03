import { ReactElement } from 'react';

export default function SpecialForYou(): ReactElement {
  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">
              Специально подобрано для вас
            </h2>
            <div className="special-for-you__controls">
              <button
                className="btn-icon special-for-you__control"
                type="button"
                aria-label="previous"
              >
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#arrow-left" />
                </svg>
              </button>
              <button
                className="btn-icon special-for-you__control"
                type="button"
                aria-label="next"
              >
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#arrow-right" />
                </svg>
              </button>
            </div>
          </div>
          <ul className="special-for-you__list">
            <li className="special-for-you__item">
              <div className="thumbnail-preview">
                <div className="thumbnail-preview__image">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="img/content/thumbnails/preview-03.webp, img/content/thumbnails/preview-03@2x.webp 2x"
                    />
                    <img
                      src="img/content/thumbnails/preview-03.jpg"
                      srcSet="img/content/thumbnails/preview-03@2x.jpg 2x"
                      width={452}
                      height={191}
                      alt=""
                    />
                  </picture>
                </div>
                <div className="thumbnail-preview__inner">
                  <h3 className="thumbnail-preview__title">crossfit</h3>
                  <div className="thumbnail-preview__button-wrapper">
                    <a
                      className="btn btn--small thumbnail-preview__button"
                      href="#"
                    >
                      Подробнее
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li className="special-for-you__item">
              <div className="thumbnail-preview">
                <div className="thumbnail-preview__image">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="img/content/thumbnails/preview-02.webp, img/content/thumbnails/preview-02@2x.webp 2x"
                    />
                    <img
                      src="img/content/thumbnails/preview-02.jpg"
                      srcSet="img/content/thumbnails/preview-02@2x.jpg 2x"
                      width={452}
                      height={191}
                      alt=""
                    />
                  </picture>
                </div>
                <div className="thumbnail-preview__inner">
                  <h3 className="thumbnail-preview__title">power</h3>
                  <div className="thumbnail-preview__button-wrapper">
                    <a
                      className="btn btn--small thumbnail-preview__button"
                      href="#"
                    >
                      Подробнее
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li className="special-for-you__item">
              <div className="thumbnail-preview">
                <div className="thumbnail-preview__image">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="img/content/thumbnails/preview-01.webp, img/content/thumbnails/preview-01@2x.webp 2x"
                    />
                    <img
                      src="img/content/thumbnails/preview-01.jpg"
                      srcSet="img/content/thumbnails/preview-01@2x.jpg 2x"
                      width={452}
                      height={191}
                      alt=""
                    />
                  </picture>
                </div>
                <div className="thumbnail-preview__inner">
                  <h3 className="thumbnail-preview__title">boxing</h3>
                  <div className="thumbnail-preview__button-wrapper">
                    <a
                      className="btn btn--small thumbnail-preview__button"
                      href="#"
                    >
                      Подробнее
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
