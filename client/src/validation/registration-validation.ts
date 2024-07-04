import Joi from 'joi';

export const UserValidation = {
NAME: {
  MIN_LENGTH: 1,
  MAX_LENGTH: 15,
},
PASSWORD: {
  MIN_LENGTH: 6,
  MAX_LENGTH: 12,
},
DESCRIPTION: {
  MIN_LENGTH: 10,
  MAX_LENGTH: 140,
},
LOSE_CALORIES: {
  MIN: 1000,
  MAX: 5000,
},
DAY_CALORIES: {
  MIN: 1000,
  MAX: 5000,
},
TRAINING_TYPE: {
  MIN_COUNT: 1,
  MAX_COUNT: 3
},
ALLOWED_IMG_EXT: ['jpg', 'jpeg', 'png']
} as const;

export const registrationValidationSchema = Joi.object({
  name: Joi.string()
    .min(UserValidation.NAME.MIN_LENGTH)
    .max(UserValidation.NAME.MAX_LENGTH)
    .required(),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  password: Joi.string()
    .min(UserValidation.PASSWORD.MIN_LENGTH)
    .max(UserValidation.PASSWORD.MAX_LENGTH)
    .required(),

  birthDate: Joi.string()
    .isoDate()
    .required(),

  role: Joi.string()
    .required(),

  gender: Joi.string()
    .required(),

  location: Joi.string()
    .required()
});
