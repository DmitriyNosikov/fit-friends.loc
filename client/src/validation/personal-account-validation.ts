import Joi from 'joi';
import { UserValidation } from './registration-validation';

export const personalAccountValidationSchema = Joi.object({
  avatar: Joi.any(),

  name: Joi.string()
    .min(UserValidation.NAME.MIN_LENGTH)
    .max(UserValidation.NAME.MAX_LENGTH),

  description: Joi.string()
    .allow('')
    .min(UserValidation.DESCRIPTION.MIN_LENGTH)
    .max(UserValidation.DESCRIPTION.MAX_LENGTH),

  isReadyToTraining: Joi.boolean(),

  trainingType: Joi.array()
    .min(UserValidation.TRAINING_TYPE.MIN_COUNT)
    .max(UserValidation.TRAINING_TYPE.MAX_COUNT),

  location: Joi.string(),
  gender: Joi.string(),
  level: Joi.string(),
});
