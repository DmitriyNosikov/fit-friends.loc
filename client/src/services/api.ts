import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { AUTH_TOKEN_KEY, deleteToken, getToken, REFRESH_TOKEN_KEY, setToken } from './token';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../const';

export const HOST = '127.0.0.1';
export const PORT = 8000;
export const BASE_URL = `http://${HOST}:${PORT}`;

const TIMEOUT = 5000;

const ERROR_TEXT = {
  NOT_AUTHORIZED: 'You aren`t authorized',
  NETWORK_CONNECTION: 'Can`t connect to backend server',
} as const;

const StatusCodesMap = [
  StatusCodes.BAD_REQUEST,
  StatusCodes.UNAUTHORIZED,
  StatusCodes.NOT_FOUND,
  StatusCodes.BAD_GATEWAY,
  StatusCodes.CONFLICT
] as const;

type DetailMessage = {
  property: string;
  value: string;
  messages: string[];
}

type ErrorMessage = {
  type: string;
  message: string;
  details: DetailMessage[];
};

type ResponseWithRetryFlag = AxiosRequestConfig<any> & { _retry?: boolean };

export function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
  });

  api.interceptors.request.use(
    (request) => {
      const token = getToken(AUTH_TOKEN_KEY);

      if (token && request.headers && !request.headers['Authorization']) {
        request.headers['Authorization'] = `Bearer ${token}`;
      }

      return request;
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError<ErrorMessage>) => {
      if (error.isAxiosError && error.code === 'ERR_NETWORK') {
        toast.error(ERROR_TEXT.NETWORK_CONNECTION);
      }

      if (!error.response) {
        throw error;
      }

      const currentPath = window.location.pathname;
      const introPage = '/intro';
      const loginPage = '/login';

      // Если получили статус Unauthorized, значит токен просрочен.
      // Пока, вместо обновления токена через Refresh, просто удаляем
      // старый токен и редиректим юзера на разводящую страницу
      if (
        error.response.status === StatusCodes.UNAUTHORIZED
        && !currentPath.startsWith(introPage)
        && !currentPath.startsWith(loginPage)
      ) {
        deleteToken();
        window.location.href = introPage;
      }

      // FIXME: Доработать. Валит кучу ошибок и работает не стабильно, но работает
      // Временно отключено из за некорректной работы
      // const refreshToken = getToken(REFRESH_TOKEN_KEY);
      // const originalRequest: ResponseWithRetryFlag = error.config;

      // if (
      //   error.response.status === StatusCodes.UNAUTHORIZED
      //   && !originalRequest._retry
      //   && refreshToken
      // ) {
      //   originalRequest._retry = true;

      //   try {
      //     const headers = { 'Authorization': `Bearer ${refreshToken}` };
      //     const { data } = await api.post(`${BASE_URL}/api/users/refresh`, {}, { headers: headers });

      //     setToken(data.accessToken);
      //     setToken(data.refreshToken, REFRESH_TOKEN_KEY);
      //   } catch (err) {
      //     throw err;
      //   }
      // }

      if (StatusCodesMap.includes(error.response.status)) {
        const { data } = error.response;
        const { message, details } = data;

        let messageText = message;

        if (message) {
          switch (error.response.status) {
            case StatusCodes.UNAUTHORIZED: {
              messageText = ERROR_TEXT.NOT_AUTHORIZED;
              break;
            }
          }

          toast.warn(messageText);
        }

        if (Array.isArray(messageText)) {
          messageText.forEach((message) => toast.warn(message));
        }

        if (details && details.length > 0) {
          details.forEach((detail) => {
            if (detail.messages) {
              detail.messages.forEach((item) => toast.warn(item));
            }
          });
        }
      }
    }
  );

  return api;
}
