import { AppRoute } from '@client/src/const';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

type SpecialForYouItemProps = {
  training: {
    id: string;
    background: string;
    title: string;
  }
};

export default function SpecialForYouItem({ training }: SpecialForYouItemProps): ReactElement {
  const { id, background, title } = training;

  return (
    <li className="special-for-you__item" key={training.id}>
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            <img
              src={background}
              srcSet={`${background}@2x.jpg 2x`}
              width={452}
              height={191}
              alt=""
            />
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">{title.toUpperCase()}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <Link
              className="btn btn--small thumbnail-preview__button"
              to={`${AppRoute.TRAININGS}${id}`}
            >
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </li>
  )
}
