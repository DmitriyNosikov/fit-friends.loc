import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
// import { MessagesType } from '../types';Z
import { TrainingService } from '@server/training/training.service';

// const TrainingMessage: MessagesType = {
//   ERROR: {
//     INCORRECT_ID: 'Passed incorrect on not existed training ID'
//   }
// } as const;

@Injectable()
export class TrainingIdValidationPipe implements PipeTransform {
  constructor(
    private readonly trainingService: TrainingService
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    console.log('USER ID VALIDATION PIPE: ', value, metadata);

    // if(metadata.type !== 'param') {
    //   throw new Error('Training ID Validation pipe can be used only with params!');
    // }

    // const isTrainingExists = await this.trainingService.findById(trainingId);
    // const isTrainingExists = await this.trainingService.findById(trainingId);

    // if(isTrainingExists) {
    //   throw new BadRequestException(`${TrainingMessage.ERROR.INCORRECT_ID}: Passed id: ${value}`);
    // }
  }
}