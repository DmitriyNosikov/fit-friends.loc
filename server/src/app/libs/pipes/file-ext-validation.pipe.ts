import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extension } from 'mime-types';

@Injectable()
export class FileExtValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const allowedExtensions = ['jpg', 'jpeg', 'png']; // TODO: Перенeсти расширения в SetMetadata
    const fileExtension = extension(value.mimetype);

    console.log('File to upload: ', value);
    // Неправильно определяется расширение, т.к. mime-type всегдаЖ text/plain - TODO: Исправить
    console.log('Extension: ', fileExtension);
    console.log('File Metadata: ', metadata);

    if(!allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException(`Unsupported file extension. Allowed to upload: ${ allowedExtensions.join(', ') }. Passed: .${fileExtension}`);
    }

    return value;
  }
}