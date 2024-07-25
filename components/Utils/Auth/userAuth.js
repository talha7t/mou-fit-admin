import { getCookie } from 'cookies-next';

export const isUserAuthenticated = () => {
  const authCookie = getCookie('userInfo');
  return authCookie !== undefined && authCookie !== '';
};
