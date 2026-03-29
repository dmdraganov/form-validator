import en from './en.json';
import ru from './ru.json';

const messages = {
  en,
  ru,
};

let currentLocale = 'en';

export const setLocale = (locale) => {
  currentLocale = locale;
};

export const getMessage = (rule) => {
  return messages[currentLocale][rule] || `Invalid field`;
};
