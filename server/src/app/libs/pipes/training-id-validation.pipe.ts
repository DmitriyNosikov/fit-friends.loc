import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { TrainingService } from '@server/training/training.service';

@Injectable()
export class TrainingIdValidationPipe implements PipeTransform {
  constructor(
    private readonly trainingService: TrainingService
  ) {}

  async transform(trainingId: string, metadata: ArgumentMetadata) {
    if(metadata.type !== 'param') {
      throw new Error('Training ID Validation pipe can be used only with params!');
    }

    await this.trainingService.findById(trainingId);

    return trainingId
  }
}