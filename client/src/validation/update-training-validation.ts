import Joi from 'joi';
import { TrainingValidation } from './create-training-validation';

export const updateTrainingValidationSchema = Joi.object({
  title: Joi.string()
    .min(TrainingValidation.TITLE.MIN_LENGTH)
    .max(TrainingValidation.TITLE.MAX_LENGTH),

  price: Joi.number()
    .min(TrainingValidation.PRICE.MIN),

  description: Joi.string()
    .min(TrainingValidation.DESCRIPTION.MIN_LENGTH)
    .max(TrainingValidation.DESCRIPTION.MAX_LENGTH)
});
