import { AppRoute } from '@client/src/const';
import { getTrainingThumbnailByType } from '@client/src/utils/adapters';
import { CreateTrainingRDO } from '@shared/training';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

type SpecialForYouItemProps = {
  training: CreateTrainingRDO
};

export default function SpecialForYouItem({ training }: SpecialForYouItemProps): ReactElement {
  const { id, title, trainingType } = training;
  const trainingThumbnail = getTrainingThumbnailByType(trainingType);

  return (
    <li className="special-for-you__item" key={training.id}>
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            <source type="image/webp" srcSet={`${trainingThumbnail}.webp, ${trainingThumbnail}@2x.webp 2x`} />
            <img src={`${trainingThumbnail}.jpg`} srcSet={`${trainingThumbnail}@2x.jpg 2x`} width="330" height="190" alt="" />
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">{title}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <Link
              className="btn btn--small thumbnail-preview__button"
              to={`${AppRoute.TRAININGS}/${id}`}
            >
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </li>
  )
}
