import axios, { AxiosError, AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { getToken } from './token';

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

export function createAPI(): AxiosInstance {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
  });

  api.interceptors.request.use(
    (request) => {
      const token = getToken();

      if(token && request.headers) {
        request.headers['Authorization'] = `Bearer ${token}`;
      }

      return request;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorMessage>) => {
      if(error.isAxiosError && error.code === 'ERR_NETWORK') {
        toast.error(ERROR_TEXT.NETWORK_CONNECTION);
      }

      if(error.response && StatusCodesMap.includes(error.response.status)) {
        const { data } = error.response;
        const { message, details } = data;

        let messageText = message;

        if(message) {
          switch(error.response.status) {
            case StatusCodes.UNAUTHORIZED: {
              messageText = ERROR_TEXT.NOT_AUTHORIZED;
              break;
            }
          }

          toast.warn(messageText);
        }

        if(Array.isArray(messageText)) {
          messageText.forEach((message) => toast.warn(message));
        }

        if(details && details.length > 0) {
          details.forEach((detail) => {
            if(detail.messages) {
              detail.messages.forEach((item) => toast.warn(item));
            }
          });
        }
      }

      throw error;
    }
  );

  return api;
}
