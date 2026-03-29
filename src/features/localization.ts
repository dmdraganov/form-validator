import en from './en.json';
import ru from './ru.json';

interface Messages {
  [key: string]: {
    [key: string]: string;
  };
}

const messages: Messages = {
  en,
  ru,
};

let currentLocale = 'en';

export const setLocale = (locale: string): void => {
  currentLocale = locale;
};

export const getMessage = (rule: string): string => {
  return messages[currentLocale][rule] || `Invalid field`;
};
