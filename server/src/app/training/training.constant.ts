export const TrainingValidation = {
    NAME: {
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
    DESTRUCTION: {
        MIN_LENGTH: 10,
        MAX_LENGTH: 140,       
    },
    TRAINERS_NAME: {
        MIN_LENGTH: 1,
        MAX_LENGTH: 15,    
    }
  } as const;