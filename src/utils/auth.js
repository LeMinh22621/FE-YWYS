import jwtDecode from 'jwt-decode';

export const TOKEN_KEY = 'jwtToken';

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function decodeToken() {
  const token = getToken();
  if (token) {
    return jwtDecode(token);
  }
  return null;
}

export function isAuthenticated() {
  const token = getToken();
  if (token) {
    const { exp } = jwtDecode(token);
    if (exp * 1000 > Date.now()) {
      return true;
    }
  }
  return false;
}