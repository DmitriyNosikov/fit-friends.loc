import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extension } from 'mime-types';

@Injectable()
export class FileExtValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const allowedImgExtensions = ['jpg', 'jpeg', 'png']; // TODO: Перенeсти расширения в SetMetadata
    const allowedVideoExtensions = ['mov', 'mp4', 'avi'];
    const fileExtension = extension(value.mimetype) || value.mimetype.split('/')[1];

    // Неправильно определяется расширение, т.к. mime-type всегда: text/plain - TODO: Исправить
    console.log('File to upload: ', value);
    console.log('Extension: ', fileExtension, typeof(value.mimetype));
    console.log('File Metadata: ', metadata);

    if(!allowedImgExtensions.includes(fileExtension) && !allowedVideoExtensions.includes(fileExtension)) {
      throw new BadRequestException(`Unsupported file extension. Allowed to upload: 
        ${ allowedImgExtensions.join(', ') } 
        ${ allowedVideoExtensions.join(', ') }. 
        Passed: .${fileExtension}`);
    }

    return value;
  }
}