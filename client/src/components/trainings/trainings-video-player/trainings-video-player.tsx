import classNames from 'classnames';
import { ReactElement, useState } from 'react';

type TrainingsVideoPlayerProps = {
  videoURL: string,
  thumbnailURL?: string,
  isBeginBtnDisabled?: boolean,
  onBeginClick?: Function,
  isEditable?: boolean
};

export default function TrainingsVideoPlayer({
  videoURL,
  thumbnailURL = '/img/content/training-video/video-thumbnail.png',
  isBeginBtnDisabled = true,
  onBeginClick,
  isEditable
}: TrainingsVideoPlayerProps): ReactElement | undefined {
  if (!videoURL) {
    return;
  }

  const [video, setVideo] = useState(videoURL);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playBtnDisabled, setPlayBtnDisabled] = useState(true);

  function handlePlayBtnClick() {
    setIsPlaying(true);
  }

  function handleBeginBtnClick() {
    if (onBeginClick) {
      onBeginClick();
    }

    setPlayBtnDisabled(false);
  }

  function handleFinishBtnClick() {
    setPlayBtnDisabled(true);
    setIsPlaying(false);
  }

  function handleDeleteBtnClick() {
    setVideo('');
  }

  function handleSaveBtnClick() {
    console.log('Saving video is not implemented yet');
  }

  return (
    <div className="training-video">
      <h2 className="training-video__title">Видео</h2>

      {
        video &&
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
              isPlaying && <video src={video} controls autoPlay />
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
      }

      {
        isEditable && !video &&
        <div className="training-video__drop-files">
          <form action="#" method="post">
            <div className="training-video__form-wrapper">
              <div className="drag-and-drop">
                <label><span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или MP4
                  <svg width={20} height={20} aria-hidden="true">
                    <use xlinkHref="#icon-import-video" />
                  </svg></span>
                  <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4" />
                </label>
              </div>
            </div>
          </form>
        </div>
      }

      <div className="training-video__buttons-wrapper">
        {
          !isEditable &&
          <>
            <button
              className={
                classNames(
                  'btn training-video__button training-video__button--start',
                  { 'visually-hidden': isPlaying }
                )
              }
              type="button"
              disabled={isBeginBtnDisabled}
              onClick={handleBeginBtnClick}
            >Приступить</button>
            <button
              className={
                classNames(
                  'btn training-video__button training-video__button--stop',
                  { 'visually-hidden': !isPlaying }
                )
              }
              type="button"
              onClick={handleFinishBtnClick}
            >Закончить</button>
          </>
        }

        {
          isEditable &&
          <div className="training-video__edit-buttons">
            <button className="btn" type="button" onClick={handleSaveBtnClick}>Сохранить</button>
            <button className="btn btn--outlined" type="button" onClick={handleDeleteBtnClick} disabled={!video}>Удалить</button>
          </div>
        }
      </div>
    </div>
  )
}
