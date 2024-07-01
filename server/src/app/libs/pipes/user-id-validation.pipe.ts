import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UserService } from '@server/user/user.service';

@Injectable()
export class UserIdValidationPipe implements PipeTransform {
  constructor(
    private readonly userService: UserService
  ) {}

  async transform(data: any, metadata: ArgumentMetadata) {
    if(metadata.type !== 'body') {
      throw new Error('Training ID Validation pipe can be used only with request body!');
    }

    if(!data.userId) {
      throw new Error(`To add review you have to pass correct user id. Passed: ${data.userId}`);
    }

    const { userId } = data;
    
    await this.userService.findById(userId);

    return data;
  }
}