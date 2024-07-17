import { ReactElement, useState } from 'react';

type TrainingsVideoPlayerProps = {
  videoURL: string,
  thumbnailURL?: string,
};

export default function TrainingsVideoPlayer({
  videoURL,
  thumbnailURL = '/img/content/training-video/video-thumbnail.png'
}: TrainingsVideoPlayerProps): ReactElement {
  const [isPlaying, setIsPlaying] = useState(false);

  function handlePlayBtnClick() {
    setIsPlaying(true);
  }

  return (
    <div className="training-video">
      <h2 className="training-video__title">Видео</h2>
      <div className="training-video__video">
        <div className="training-video__thumbnail">
          {
            !isPlaying &&
            <picture>
              <source type="image/webp" srcSet="/img/content/training-video/video-thumbnail.webp, /img/content/training-video/video-thumbnail@2x.webp 2x" />
              <img src={thumbnailURL} srcSet="/img/content/training-video/video-thumbnail@2x.png 2x" width="922" height="566" alt="Обложка видео" />
            </picture>
          }

          {
            isPlaying && <video src={videoURL} controls />
          }
        </div>

        {
          videoURL && !isPlaying &&
          <button className="training-video__play-button btn-reset" onClick={handlePlayBtnClick}>
            <svg width={18} height={30} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
        }
      </div>

      <div className="training-video__buttons-wrapper">
        <button className="btn training-video__button training-video__button--start" type="button" disabled>Приступить</button>
        <button className="btn training-video__button training-video__button--stop" type="button">Закончить</button>
      </div>
    </div>
  )
}
