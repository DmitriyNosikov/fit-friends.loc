import Schema from 'validate';

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
  ALLOWED_IMG_EXT: [ 'jpg', 'jpeg', 'png' ]
} as const;

export const registrationValidation = new Schema({
  name: {
    type: String,
    required: true,
    length: { min: UserValidation.NAME.MIN_LENGTH, max: UserValidation.NAME.MAX_LENGTH }
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    length: { min: UserValidation.PASSWORD.MIN_LENGTH, max: UserValidation.PASSWORD.MAX_LENGTH }
  },
  birthDate: {
    type: Date,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});
