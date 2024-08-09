import CustomSelectBtn from '@client/src/components/custom-select-btn/custom-select-btn';
import RadioGender from '@client/src/components/radio-gender/radio-gender';
import { AppRoute } from '@client/src/const';
import { useAppDispatch } from '@client/src/hooks';
import useFetchAdditionalInfo from '@client/src/hooks/useFetchAdditionalInfo';
import { createTrainingAction } from '@client/src/store/actions/api-training-action';
import { createTrainingValidationSchema } from '@client/src/validation/create-training-validation';
import { validateFields } from '@client/src/validation/validation-tools';
import { Gender } from '@server/libs/types';
import { CreateTrainingDTO } from '@shared/training';
import { ReactElement, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function TrainingsCreate(): ReactElement {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const additionalInfo = useFetchAdditionalInfo();
  const type = additionalInfo?.trainingType;
  const duration = additionalInfo?.trainingDuration;
  const levels = additionalInfo?.levels;
  const gender = additionalInfo?.gender;
  const gendersList = gender && gender.map((item) => adaptGenderToClient(item));

  const title = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const calories = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const [trainingGender, setTrainingGender] = useState('всем');
  const [trainingType, setTrainingType] = useState();
  const [trainingDuration, setTrainingDuration] = useState();
  const [userLevel, setUserLevel] = useState();
  const [videoURL, setVideoURL] = useState('Загрузите сюда файлы формата MOV, AVI или MP4');

  function adaptGenderToClient(gender: Gender) {
    let adaptedGender = '';

    switch (gender) {
      case 'мужской': adaptedGender = 'мужчинам'; break
      case 'женский': adaptedGender = 'женщинам'; break
      case 'неважно': adaptedGender = 'всем'; break
    }

    return adaptedGender;
  }

  function adaptGenderToServer(gender: string) {
    let adaptedGender = '';

    switch (gender) {
      case 'мужчинам': adaptedGender = 'мужской'; break
      case 'женщинам': adaptedGender = 'женский'; break
      case 'всем': adaptedGender = 'неважно'; break
    }

    return adaptedGender;
  }

  function handleUploadVideoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    console.log('Video info: ', target.files);

    setVideoURL(target.value);
  }

  function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trainingData = {
      title: title.current?.value,
      trainingType: trainingType,
      calories: Number(calories.current?.value),
      trainingDuration: trainingDuration,
      price: Number(price.current?.value),
      userLevel: userLevel,
      gender: adaptGenderToServer(trainingGender) as Gender,
      description: description.current?.value,

      background: "",
      video: videoURL,
    };

    const [isFormHasErrors] = validateFields<Partial<CreateTrainingDTO>>(trainingData, createTrainingValidationSchema);

    if (isFormHasErrors) {
      return false;
    }

    dispatch(createTrainingAction(trainingData))
      .then((result) => {
        if ('error' in result) {
          return;
        }

        toast.success('New training has been successfully added');

        navigate(AppRoute.ACCOUNT);
      })
  }

  return (
    <div className="popup-form popup-form--create-training">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Создание тренировки</h1>
          </div>
          <div className="popup-form__form">
            <form method="get" onSubmit={handleSubmitForm}>
              <div className="create-training">
                <div className="create-training__wrapper">
                  <div className="create-training__block">
                    <h2 className="create-training__legend">Название тренировки</h2>
                    <div className="custom-input create-training__input" id="title">
                      <label>
                        <span className="custom-input__wrapper">
                          <input type="text" name="training-name" ref={title} />
                        </span>
                        <span className="custom-input__error"></span>
                      </label>
                    </div>
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">Характеристики тренировки</h2>
                    <div className="create-training__info">

                      <div className="custom-select custom-select--not-selected" id="trainingType">
                        <span className="custom-select__label">Выберите тип тренировки</span>
                        <div className="custom-select__placeholder">{trainingType}</div>
                        {
                          type &&
                          <CustomSelectBtn
                            itemsList={type}
                            uniqCSSId='create-training__type'
                            onItemSelect={setTrainingType}
                          />
                        }
                        <span className="custom-input__error"></span>
                      </div>

                      <div className="custom-input custom-input--with-text-right" id="calories">
                        <label>
                          <span className="custom-input__label">Сколько калорий потратим</span>
                          <span className="custom-input__wrapper">
                            <input type="number" name="calories" ref={calories} />
                            <span className="custom-input__text">ккал</span>
                          </span>
                          <span className="custom-input__error"></span>
                        </label>
                      </div>

                      <div className="custom-select custom-select--not-selected" id="trainingDuration">
                        <span className="custom-select__label">Сколько времени потратим</span>
                        <div className="custom-select__placeholder">{trainingDuration} мин.</div>
                        {
                          duration &&
                          <CustomSelectBtn
                            itemsList={duration}
                            uniqCSSId='create-training__duration'
                            onItemSelect={setTrainingDuration}
                          />
                        }
                        <span className="custom-input__error"></span>
                      </div>

                      <div className="custom-input custom-input--with-text-right" id="price">
                        <label>
                          <span className="custom-input__label">Стоимость тренировки</span>
                          <span className="custom-input__wrapper">
                            <input type="number" name="price" ref={price} />
                            <span className="custom-input__text">₽</span>
                          </span>
                          <span className="custom-input__error"></span>
                        </label>
                      </div>

                      <div className="custom-select custom-select--not-selected" id="userLevel">
                        <span className="custom-select__label">Выберите уровень тренировки</span>
                        <div className="custom-select__placeholder">{userLevel}</div>
                        {
                          levels &&
                          <CustomSelectBtn
                            itemsList={levels}
                            uniqCSSId='create-training__levels'
                            onItemSelect={setUserLevel}
                          />
                        }
                        <span className="custom-input__error"></span>
                      </div>

                      <div className="create-training__radio-wrapper" id="gender">
                        <span className="create-training__label">Кому подойдет тренировка</span><br />
                        {
                          gendersList &&
                          <RadioGender
                            genderList={gendersList}
                            selectedItem={trainingGender}
                            onGenderChange={setTrainingGender}
                            containerAdditionalClass='create-training__radio'
                          />
                        }
                        <span className="custom-input__error"></span>
                      </div>
                    </div>
                  </div>

                  <div className="create-training__block" id="description">
                    <h2 className="create-training__legend">Описание тренировки</h2>
                    <div className="custom-textarea create-training__textarea">
                      <label>
                        <textarea name="description" placeholder=" " defaultValue={""} ref={description} />
                      </label>
                    </div>
                    <span className="custom-input__error"></span>
                  </div>

                  <div className="create-training__block">
                    <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
                    <div className="drag-and-drop create-training__drag-and-drop">
                      <label>
                        <span className="drag-and-drop__label" tabIndex={0}>{videoURL}
                          <svg width={20} height={20} aria-hidden="true">
                            <use xlinkHref="#icon-import-video" />
                          </svg>
                        </span>
                        <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4" onChange={handleUploadVideoChange} />
                      </label>
                    </div>
                  </div>
                </div>

                <button className="btn create-training__button" type="submit">Опубликовать</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
