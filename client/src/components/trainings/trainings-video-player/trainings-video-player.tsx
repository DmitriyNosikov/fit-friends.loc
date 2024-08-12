import { BASE_URL } from '@client/src/services/api';
import classNames from 'classnames';
import { ReactElement, useEffect, useState } from 'react';
import VideoUploader from '../../video-uploader/video-uploader';

type TrainingsVideoPlayerProps = {
  videoURL: string,
  thumbnailURL?: string,
  isBeginBtnDisabled?: boolean,
  isEditable?: boolean,
  onBeginBtnClick?: Function,
  onChangeVideo?: Function
};

export default function TrainingsVideoPlayer({
  videoURL,
  thumbnailURL = '/img/content/training-video/video-thumbnail.png',
  isBeginBtnDisabled = true,
  isEditable,
  onBeginBtnClick,
  onChangeVideo
}: TrainingsVideoPlayerProps): ReactElement | undefined {
  const [video, setVideo] = useState(videoURL);
  const [newVideo, setNewVideo] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playBtnDisabled, setPlayBtnDisabled] = useState(true);

  useEffect(() => {
    let isMounted = true

    if (isMounted) {

      if(!isEditable) {
        setVideo(`${BASE_URL}${videoURL}`);
      }

      setPlayBtnDisabled(!isEditable);
    }

    return () => {
      isMounted = false;
    }
  })

  function handlePlayBtnClick() {
    setIsPlaying(true);
  }

  function handleBeginBtnClick() {
    if (onBeginBtnClick) {
      onBeginBtnClick();
    }

    setPlayBtnDisabled(false);
  }

  function handleFinishBtnClick() {
    setPlayBtnDisabled(true);
    setIsPlaying(false);
  }

  function handleDeleteBtnClick() {
    setVideo('');
    setNewVideo('');
  }

  function handleSaveBtnClick() {
    if (onChangeVideo) {
      onChangeVideo(newVideo);
    }
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
        !isEditable && !video &&
        <p>Видео для данной тренировки пока не загружено :(</p>
      }

      { // Загрузка видео
        isEditable && !video &&
        <div className="training-video__drop-files">
          <form action="#" method="post">
            <div className="training-video__form-wrapper">
              <VideoUploader onVideoUpload={setNewVideo} />
            </div>
          </form>
        </div>
      }

      <div className="training-video__buttons-wrapper">
        { // Кнопки управления видео
          !isEditable && video &&
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

        { // Кнопки Сохранения/Удаления видео
          isEditable &&
          <div className="training-video__edit-buttons">
            <button className="btn" type="button" disabled={!newVideo} onClick={handleSaveBtnClick}>Сохранить</button>
            <button className="btn btn--outlined" type="button" onClick={handleDeleteBtnClick} disabled={!video}>Удалить</button>
          </div>
        }
      </div>
    </div>
  )
}
