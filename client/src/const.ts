import { BASE_URL } from './services/api';

export const SPECIAL_FOR_YOU_MAX_SLIDES_COUNT = 9;
export const POPULAR_MAX_SLIDES_COUNT = 9;
export const SPECIAL_OFFERS_MAX_SLIDES_COUNT = 3;
export const DEFAULT_AVATAR_URL = '/img/content/no-user-photo.png';
export const ITEMS_PER_PAGE = 6;

// -- Backend API
const BACKEND_API_URL = {
  USERS: `${BASE_URL}/api/users`,
  LOAD_FILES: `${BASE_URL}/api/files`,
  GET_FILES: `${BASE_URL}/api/static`,
  TRAININGS: `${BASE_URL}/api/trainings`,
  TRAINING_REVIEWS: `${BASE_URL}/api/training-reviews`,
  ORDERS: `${BASE_URL}/api/orders`,
  BALANCE: `${BASE_URL}/api/balance`,
  REQUEST: `${BASE_URL}/api/requests`,
}
export const ApiRoute = {
  USER_API: BACKEND_API_URL.USERS,
  USER_FRIENDS: `${BACKEND_API_URL.USERS}/friends`,
  USER_SEARCH: `${BACKEND_API_URL.USERS}/search`,

  REGISTER: `${BACKEND_API_URL.USERS}/register`,
  LOGIN: `${BACKEND_API_URL.USERS}/login`,
  CHECK_JWT_TOKEN: `${BACKEND_API_URL.USERS}/check`,
  REFRESH_JWT_TOKEN: `${BACKEND_API_URL.USERS}/refresh`,
  GET_ADDITIONAL_INFO: `${BACKEND_API_URL.USERS}/additional`,

  LOAD_FILES: `${BACKEND_API_URL.LOAD_FILES}/upload`,
  LOAD_MULTIPLE_FILES: `${BACKEND_API_URL.LOAD_FILES}/multiple-upload`,

  TRAININGS_API: BACKEND_API_URL.TRAININGS,
  CONVENIENT_TRAININGS_API: `${BACKEND_API_URL.TRAININGS}/convenient-trainings`,
  WITH_DISCOUNT_TRAININGS_API: `${BACKEND_API_URL.TRAININGS}/with-discount`,
  WITH_RATING_TRAININGS_API: `${BACKEND_API_URL.TRAININGS}/with-rating`,
  FILTER_PARAMS: `${BACKEND_API_URL.TRAININGS}/filter-params`,

  TRAINING_REVIEWS_API: BACKEND_API_URL.TRAINING_REVIEWS,

  ORDERS_API: BACKEND_API_URL.ORDERS,

  BALANCE_API: BACKEND_API_URL.BALANCE,

  REQUEST_API: BACKEND_API_URL.REQUEST
} as const;

// -- App
export const AppRoute = {
  MAIN: '/',
  INTRO: '/intro',
  LOGIN: '/login',
  REGISTRATION: '/registration',
  ACCOUNT: '/account',
  PERSONAL_CARD: '/personal-card',
  USERS: '/users',
  FRIENDS: '/friends',
  TRAININGS: '/trainings',
  TRAININGS_CREATE: '/trainings-create',
  ORDERS: '/orders',
  PURCHASES: '/purchases',
  PAGE_404: '/page404',
} as const;


// STATE NAMESPACES
export const Namespace = {
  MAIN: 'MAIN',
  USER: 'USER',
  TRAINING: 'TRAINING',
  TRAINING_REVIEWS: 'TRAINING_REVIEWS',
  REQUEST: 'REQUEST',
  ORDER: 'ORDER',
  BALANCE: 'BALANCE'
} as const;

// USER AUTH STATUSES
export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
} as const;

export type AuthorizationStatusList = (typeof AuthorizationStatus)[keyof typeof AuthorizationStatus];

// API REQUEST STATUSES
export const SEND_DATA_STATUS = {
  NONE: 'NONE',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
} as const;
