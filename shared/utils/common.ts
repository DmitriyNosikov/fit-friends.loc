import { Transform } from 'class-transformer';

export function TransformValueToArray() {
  return Transform(({ value }) => {
    if(value && !Array.isArray(value)) {
      value = [value];
    }

    return value;
  })
}

export function TransformValueToBoolean() {
  return Transform((field) => {
    if(field.value) {
      if(field.value === 'false' || parseInt(field.value) <= 0) {
        return false;
      }

      return !!field.value;
    }
  })
}


export function TransformValueToNumber() {
  return Transform((field) => {
    if(field.value) {
      return Number(field.value);
    }
  })
}