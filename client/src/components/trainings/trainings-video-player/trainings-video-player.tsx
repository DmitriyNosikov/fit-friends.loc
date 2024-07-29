import classNames from 'classnames';
import { ReactElement, useState } from 'react';

type TrainingsVideoPlayerProps = {
  videoURL: string,
  thumbnailURL?: string,
  isBeginBtnDisabled?: boolean,
  onBeginClick?: Function
};

export default function TrainingsVideoPlayer({
  videoURL,
  thumbnailURL = '/img/content/training-video/video-thumbnail.png',
  isBeginBtnDisabled = true,
  onBeginClick
}: TrainingsVideoPlayerProps): ReactElement | undefined {
  if(!videoURL) {
    return;
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const [playBtnDisabled, setPlayBtnDisabled] = useState(true);

  const beginBtn = document.querySelector('.training-video__button--start');
  const finishBtn = document.querySelector('.training-video__button--stop');


  function handlePlayBtnClick() {
    setIsPlaying(true);
  }

  function handleBeginBtnClick() {
    if(!beginBtn || !finishBtn) {
      return;
    }

    if(onBeginClick) {
      onBeginClick();
    }

    beginBtn.classList.add('visually-hidden');
    finishBtn.classList.remove('visually-hidden');

    setPlayBtnDisabled(false);
  }

  function handleFinishBtnClick() {
    if(!beginBtn || !finishBtn) {
      return;
    }

    finishBtn.classList.add('visually-hidden');
    beginBtn.classList.remove('visually-hidden');

    setPlayBtnDisabled(true);
    setIsPlaying(false);
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
            isPlaying && <video src={videoURL} controls autoPlay/>
          }
        </div>

        {
          !isPlaying &&
          <button
            className={
              classNames(
                'training-video__play-button btn-reset',
                { 'is-disabled': playBtnDisabled }
              )
            }

            onClick={handlePlayBtnClick}
          >
            <svg width={18} height={30} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
        }
      </div>

      <div className="training-video__buttons-wrapper">
        <button
          className="btn training-video__button training-video__button--start"
          type="button"
          disabled={isBeginBtnDisabled}
          onClick={handleBeginBtnClick}
          >Приступить</button>
        <button
          className="btn training-video__button training-video__button--stop visually-hidden"
          type="button"
          onClick={handleFinishBtnClick}
          >Закончить</button>
      </div>
    </div>
  )
}
