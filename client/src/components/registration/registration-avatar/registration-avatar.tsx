import { getImgPreviewLink } from '@client/src/utils/common';
import { ReactElement, useRef } from 'react';

type RegistrationAvatarProps = {
  onAvatarUpload?: Function
}

export default function RegistrationAvatar({ onAvatarUpload }: RegistrationAvatarProps): ReactElement {
  const userAvatar = useRef<HTMLInputElement>(null);
  const avatarContainer = document.querySelector('.input-load-avatar__btn');

  function handleAvatarChange() {
    const target = userAvatar?.current;

    if(!target?.files) {
      return;
    }

    const avatar = target?.files[0];

    getImgPreviewLink(avatar, (link: string | ArrayBuffer | null) => {
      if(link) {
        avatarContainer?.setAttribute('style', `background-image: url(${link}); background-size: cover;`);
      }
    })

    if(!onAvatarUpload) {
      return;
    }

    const formData = new FormData();
    formData.append('file', avatar);

    onAvatarUpload(formData);
  }

  return (
    <div className="sign-up__load-photo">
      <div className="input-load-avatar">
        <label>
          <input className="visually-hidden" type="file" accept="image/png, image/jpeg" onChange={handleAvatarChange} ref={userAvatar}/>
          <span className="input-load-avatar__btn">
            <svg width="20" height="20" aria-hidden="true">
              <use xlinkHref="#icon-import"></use>
            </svg>
          </span>
        </label>
      </div>
      <div className="sign-up__description">
        <h2 className="sign-up__legend">Загрузите фото профиля</h2><span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
      </div>
    </div>
  )
}
