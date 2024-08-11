import Joi from 'joi';

export const TrainingValidation = {
  TITLE: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 15,
  },
  PRICE: {
    MIN: 0
  },
  CALORIES: {
    MIN: 1000,
    MAX: 5000
  },
  DESCRIPTION: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 140,
  }
} as const;

export const createTrainingValidationSchema = Joi.object({
  title: Joi.string()
    .min(TrainingValidation.TITLE.MIN_LENGTH)
    .max(TrainingValidation.TITLE.MAX_LENGTH)
    .required(),

  trainingType: Joi.string()
    .required(),

  calories: Joi.number()
    .min(TrainingValidation.CALORIES.MIN)
    .max(TrainingValidation.CALORIES.MAX),

  trainingDuration: Joi.string()
    .required(),

  price: Joi.number()
    .min(TrainingValidation.PRICE.MIN),

  userLevel: Joi.string()
    .required(),

  gender: Joi.string()
    .required(),

  description: Joi.string()
    .min(TrainingValidation.DESCRIPTION.MIN_LENGTH)
    .max(TrainingValidation.DESCRIPTION.MAX_LENGTH)
    .required(),

  background: Joi.string()
    .allow(''),

  video: Joi.string()
    .allow(''),

  uploadingFile: Joi.any()
    .allow('')
});
