import { TrainingSearchQuery } from '@shared/training';
import { BaseSearchQuery } from '@shared/types';

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

function getUrlStringFromArray(key: string, values: string[]): string {
  let temp = [];
  let preparedString = '';

  temp = values.map((item) => `${key}[]=${item}`)
  preparedString = temp.join('&');

  return preparedString;
}
