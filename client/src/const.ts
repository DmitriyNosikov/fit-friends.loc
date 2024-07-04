import { BASE_URL } from './services/api';

// -- Backend API
const BACKEND_API_URL = {
  USERS: `${BASE_URL}/api/users`
}
export const ApiRoute = {
  USER_API: BACKEND_API_URL.USERS,

  REGISTER: `${BACKEND_API_URL.USERS}/register`,
  LOGIN: `${BACKEND_API_URL.USERS}/login`,
  CHECK_JWT_TOKEN: `${BACKEND_API_URL.USERS}/check`,
  GET_ADDITIONAL_INFO: `${BACKEND_API_URL.USERS}/additional`
} as const;

// -- App
export const AppRoute = {
  MAIN: '/',
  INTRO: '/intro',
  LOGIN: '/login',
  REGISTRATION: '/registration',
  PAGE_404: '/page404',
} as const;


// STATE NAMESPACES
export const Namespace = {
  MAIN: 'MAIN',
  USER: 'USER',
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
