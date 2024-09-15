import { TrainingType } from '@server/libs/types';
import { UserLevelEnum } from '@shared/types/user-level.enum';

export function createSearchURL<T extends Record<string, unknown>>(baseURL: string, searchQuery?: T) {
  let url = baseURL;

  if(searchQuery && Object.keys(searchQuery).length > 0) {
    const queryString = adaptQueryParams(searchQuery as Record<string, unknown>);

    url += `?${queryString}`;
  }

  return url;
}

export function adaptQueryParams(queryString: Record<string, unknown>) {
  let adaptedQueryString = '';
  let tempStorage: string[] = [];

  for(const [key, value] of Object.entries(queryString)) {
    if(Array.isArray(value) && value.length <= 0) {
      continue;
    }

    if(Array.isArray(value)) {
      tempStorage.push(getUrlStringFromArray(key, value));
    } else {
      tempStorage.push(`${key}=${value}`);
    }
  }

  if(tempStorage.length > 0) {
    adaptedQueryString = tempStorage.join('&');
  }

  return adaptedQueryString;
}

export function getUrlStringFromArray(key: string, values: string[]): string {
  let temp = [];
  let preparedString = '';

  temp = values.map((item) => `${key}[]=${item}`)
  preparedString = temp.join('&');

  return preparedString;
}

export function getAdaptedUserLevel(level: string) {
  let userLevel = '';

  switch (level) {
    case UserLevelEnum.NEWBIE: {
      userLevel = 'новичок';
      break;
    }
    case UserLevelEnum.REGULAR: {
      userLevel = 'любитель';
      break;
    }
    case UserLevelEnum.PRO: {
      userLevel = 'профессионал';
      break;
    }

    default: {
      userLevel = level;
      break;
    }
  }

  return userLevel;
}

export function adaptPaymentType(type: string) {
  return (type === 'мир') ? 'mir' : type;
}

export function getTrainingThumbnailByType(type: TrainingType) {
  switch(type) {
    case 'йога': return '/img/content/thumbnails/training-01';
    case 'бег': return '/img/content/thumbnails/training-06';
    case 'бокс': return '/img/content/thumbnails/training-03';
    case 'стретчинг': return '/img/content/thumbnails/training-12';
    case 'кроссфит': return '/img/content/thumbnails/training-02';
    case 'аэробика': return '/img/content/thumbnails/training-09';
    case 'пилатес': return '/img/content/thumbnails/training-05';
    default: return '/img/content/thumbnails/training-11';
  }
}

export function getTrainingPromoByType(type: TrainingType) {
  switch(type) {
    case 'аэробика': return '/img/content/promo-1';
    case 'стретчинг': return '/img/content/promo-2';
    case 'пилатес': return '/img/content/promo-3';
    default: return '/img/content/promo-2';
  }
}
