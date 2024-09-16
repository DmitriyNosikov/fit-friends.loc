import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extension } from 'mime-types';

// TODO: Перенeсти расширения в SetMetadata
const AllowedExtensions = {
  IMAGE: ['jpg', 'jpeg', 'png'],
  VIDEO: ['mov', 'mp4', 'avi'],
  FILE: ['pdf']
}

@Injectable()
export class FilesExtValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    console.log('Uploading files (value): ', value);
    console.log('Files Metadata: ', metadata);

    const errorFileNames = [];

    if (Array.isArray(value)) {
      value.forEach((item) => {
        const extensionValidationResult = checkExtension(item);

        if (!extensionValidationResult) {
          errorFileNames.push(item.originalname);
        }
      });
    } else {
      checkExtension(value) ? '' : errorFileNames.push(value.originalname);
    }

    if (errorFileNames.length > 0) {
      const allowedExtensions = getAllowedExtensions();
      const fileExtension = getFileExtension(value);

      throw new BadRequestException(`Unsupported file extension. Allowed to upload: 
      ${allowedExtensions.join(', ')}
      Passed: .${fileExtension}`);
    }

    return value;
  }
}

function checkExtension(value: any) {
  const allowedExtensions = getAllowedExtensions();
  const fileExtension = getFileExtension(value);

  if (!allowedExtensions.includes(fileExtension)) {
    return false;
  }

  return true;
}

function getAllowedExtensions() {
  const allowedExtensions = AllowedExtensions.IMAGE
    .concat(AllowedExtensions.VIDEO)
    .concat(AllowedExtensions.FILE);
  
  return allowedExtensions;
}

function getFileExtension(value: any) {
  if(!value?.mimetype) {
    throw new BadRequestException(`Mimetype couldn't be determined for passed file: ${value.originalname}`);
  }

  const fileExtension = extension(value.mimetype) || value.mimetype.split('/')[1];

  return fileExtension;
}