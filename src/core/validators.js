export const email = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const phone = (value) => /^\+[1-9]\d{1,14}$/.test(value);

export const password = (value, options = {}) => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSymbols = true,
  } = options;

  const hasUppercase = /[A-Z]/.test(value);
  const hasLowercase = /[a-z]/.test(value);
  const hasNumbers = /\d/.test(value);
  const hasSymbols = /[^A-Za-z0-9]/.test(value);

  return (
    value.length >= minLength &&
    (!requireUppercase || hasUppercase) &&
    (!requireLowercase || hasLowercase) &&
    (!requireNumbers || hasNumbers) &&
    (!requireSymbols || hasSymbols)
  );
};

// A simple URL regex. For production, consider a more robust library like `validator.js`.
export const url = (value) => {
  return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?.*)?$/.test(value);
};

// This is a simple date validation. For production, consider a more robust library like `date-fns` or `moment.js`.
export const date = (value, options = {}) => {
  const { format = 'YYYY-MM-DD' } = options;
  // This is a simple date validation, a more robust solution would use a library like moment.js or date-fns
  const parts = value.split(/[-/.]/);
  const formatParts = format.split(/[-/.]/);
  const dateObj = {};

  if (parts.length !== formatParts.length) {
    return false;
  }

  for (let i = 0; i < formatParts.length; i++) {
    dateObj[formatParts[i]] = parseInt(parts[i], 10);
  }

  const d = new Date(dateObj.YYYY, dateObj.MM - 1, dateObj.DD);
  return d && (d.getMonth() + 1) === dateObj.MM;
};
