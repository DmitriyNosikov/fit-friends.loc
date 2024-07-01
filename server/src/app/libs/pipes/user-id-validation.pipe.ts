import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class UserIdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('USER ID VALIDATION PIPE: ', value, metadata);
  }
}