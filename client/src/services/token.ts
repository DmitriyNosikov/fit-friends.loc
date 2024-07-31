export const AUTH_TOKEN_KEY = 'jwt-token';
export const REFRESH_TOKEN_KEY = 'refresh-token';

export function setToken(token: string, key: string = AUTH_TOKEN_KEY) {
  localStorage.setItem(key, token);
}

export function getToken(key: string = AUTH_TOKEN_KEY) {
  return localStorage.getItem(key) || '';
}

export function deleteToken(key: string = AUTH_TOKEN_KEY) {
  localStorage.removeItem(key);
}
