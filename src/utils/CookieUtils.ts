import Cookies from '@react-native-cookies/cookies';
import { DEVBASEURL } from '../config/Env';

export const SESSION_COOKIE_NAME = 'connect.sid';

export const saveCookie = async (value: string) => {
  try {
    await Cookies.set(DEVBASEURL, {
      name: SESSION_COOKIE_NAME,
      value,
      path: '/',
      secure: false,
      httpOnly: false,
    });
    console.log('Cookie saved successfully');
  } catch (error) {
    console.error('Error saving cookie:', error);
  }
};

export const getCookie = async () => {
  try {
    const cookies = await Cookies.get(DEVBASEURL);
    return cookies[SESSION_COOKIE_NAME]?.value;
  } catch (error) {
    console.error('Error getting cookie:', error);
    return null;
  }
};

export const clearCookies = async () => {
  try {
    await Cookies.clearAll();
    console.log('Cookies cleared successfully');
  } catch (error) {
    console.error('Error clearing cookies:', error);
  }
};