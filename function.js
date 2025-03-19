/* eslint-disable no-unused-vars */
import {PermissionsAndroid} from 'react-native';

export const truncateText = (text, limit) => {
  return text.length > limit ? text.substring(0, limit) + '...' : text;
};
export const getFormattedDate = (dateStr, formatted) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let inputDate;
  if (formatted) {
    inputDate = new Date(dateStr);
  } else {
    const [datePart, timePart] = dateStr.split(' ');
    const [day, monthAbbr, year] = datePart.split('-');
    const monthIndex = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ].indexOf(monthAbbr);
    inputDate = new Date(year, monthIndex, day);
  }
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);
  if (
    inputDate.getDate() === today.getDate() &&
    inputDate.getFullYear() === today.getFullYear() &&
    inputDate.getMonth() === today.getMonth()
  ) {
    return 'Today';
  } else if (
    inputDate.getDate() === yesterday.getDate() &&
    inputDate.getFullYear() === yesterday.getFullYear() &&
    inputDate.getMonth() === yesterday.getMonth()
  ) {
    return 'Yesterday';
  } else {
    const dayOfWeek = inputDate.toLocaleDateString('en-US', {weekday: 'long'});
    const formattedDate = `${dayOfWeek}, ${inputDate.getDate()} ${
      months[inputDate.getMonth()]
    }`;
    return formattedDate;
  }
};

export const compareTwoDates = (dateStr1, dateStr2, formatted) => {
  function parseDate(dateStr) {
    const [datePart, timePart] = dateStr.split(' ');
    const [day, monthAbbr, year] = datePart.split('-');
    const monthIndex = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ].indexOf(monthAbbr);
    return new Date(year, monthIndex, day);
  }
  const newDate = formatted ? dateStr1 : parseDate(dateStr1);
  const previousDate = formatted ? dateStr2 : parseDate(dateStr2);
  return newDate.getDate() !== previousDate.getDate();
};
export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
