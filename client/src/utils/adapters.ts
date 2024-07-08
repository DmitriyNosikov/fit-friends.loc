import { TrainingSearchQuery } from '@shared/training';
import { BaseSearchQuery } from '@shared/types';
import { UserLevelEnum } from '@shared/types/user-level.enum';

export function adaptQueryParams(queryString: BaseSearchQuery | TrainingSearchQuery) {
  let adaptedQueryString = '';
  let tempStorage: string[] = [];

  for(const [key, value] of Object.entries(queryString)) {
    if((key === 'type' || key === 'stringsCount') && Array.isArray(value)) {
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
