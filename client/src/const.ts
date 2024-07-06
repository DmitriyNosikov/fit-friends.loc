import { BASE_URL } from './services/api';

export const SPECIAL_FOR_YOU_MAX_SLIDES_COUNT = 9;

// -- Backend API
const BACKEND_API_URL = {
  USERS: `${BASE_URL}/api/users`,
  LOAD_FILES: `${BASE_URL}/api/files`,
  GET_FILES: `${BASE_URL}/api/static`,
  TRAININGS: `${BASE_URL}/api/trainings`,
}
export const ApiRoute = {
  USER_API: BACKEND_API_URL.USERS,

  REGISTER: `${BACKEND_API_URL.USERS}/register`,
  LOGIN: `${BACKEND_API_URL.USERS}/login`,
  CHECK_JWT_TOKEN: `${BACKEND_API_URL.USERS}/check`,
  GET_ADDITIONAL_INFO: `${BACKEND_API_URL.USERS}/additional`,

  LOAD_FILES: `${BACKEND_API_URL.LOAD_FILES}/upload`,

  TRAININGS_API: `${BACKEND_API_URL.TRAININGS}/`,
  CONVENIENT_TRAININGS_API: `${BACKEND_API_URL.TRAININGS}/convenient-trainings`,
} as const;

// -- App
export const AppRoute = {
  MAIN: '/',
  INTRO: '/intro',
  LOGIN: '/login',
  REGISTRATION: '/registration',
  ACCOUNT: '/account',
  TRAININGS: '/trainings',
  PAGE_404: '/page404',
} as const;


// STATE NAMESPACES
export const Namespace = {
  MAIN: 'MAIN',
  USER: 'USER',
  TRAINING: 'TRAINING'
} as const;

// USER AUTH STATUSES
export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
} as const;

// API REQUEST STATUSES
export const SEND_DATA_STATUS = {
  NONE: 'NONE',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
} as const;
