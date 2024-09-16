import { DEFAULT_AVATAR_URL } from '../const';
import { BASE_URL } from '../services/api';

const DEBOUNCE_TIMEOUT = 800;

export function upperCaseFirst(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function areArraysEqual(arrayA: unknown[], arrayB: unknown[]) {
  return arrayA.toString() === arrayB.toString();
}

export function getFilePreviewLink(file: File, onLoad?: Function) {
  const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.addEventListener('loadend', () => {
      if(!onLoad) {
        return fileReader.result;
      }

      onLoad(fileReader.result);
    })
}

export function getAvatarByUrl(avatarImg: string | undefined) {
  const userAvatar = avatarImg
    ? avatarImg.startsWith('/static') // Путь к загруженным на сервер аватаркам начинается с /static
      ? `${BASE_URL}${avatarImg}` // Для аватарок, загруженных на сервер юзерами
      : avatarImg // Для моковых изображений, которые "захардкожены" в сидировании
    : DEFAULT_AVATAR_URL; // Если аватарки нет

  return userAvatar;
}

export function setBodyScrollAvailable(isScrollAvailable: boolean) {
  if(isScrollAvailable) {
    document.body.classList.remove('no-scroll');
    return;
  }

  document.body.classList.add('no-scroll');
}

// Функции для устранения дребезга
export function debounce(callback: Function, timeout = DEBOUNCE_TIMEOUT) {
  let timerId: NodeJS.Timeout | null  = null;

  return function (...rest: unknown[]) {
    if(timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => callback.apply(this, rest), timeout);
  };
}
