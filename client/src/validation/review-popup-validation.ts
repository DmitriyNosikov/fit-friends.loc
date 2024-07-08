import Joi from 'joi';
import { TrainingReviewValidation } from '@server/training-review/training-review.constant';

export const reviewPopupValidationSchema = Joi.object({
  userId: Joi.string()
    .required(),

  trainingId: Joi.string()
    .required(),

  rating: Joi.number()
    .min(TrainingReviewValidation.RATING.MIN)
    .max(TrainingReviewValidation.RATING.MAX)
    .required(),

  text: Joi.string()
    .min(TrainingReviewValidation.TEXT.MIN_LENGTH)
    .max(TrainingReviewValidation.TEXT.MAX_LENGTH)
    .required(),
});
