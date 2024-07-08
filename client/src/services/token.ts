const AUTH_TOKEN_KEY = 'jwt-token';

export function setToken(token: string) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY) || '';
}

export function deleteToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}
