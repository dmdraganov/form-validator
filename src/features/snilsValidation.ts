export const validateSnils = (snils: string): boolean => {
  if (typeof snils !== 'string') {
    return false;
  }

  const cleanSnils = snils.replace(/\D/g, '');

  if (cleanSnils.length !== 11) {
    return false;
  }

  const mainPart = cleanSnils.substring(0, 9);
  const controlDigitsInput = parseInt(cleanSnils.substring(9, 11), 10);

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(mainPart[i], 10) * (9 - i);
  }

  let calculatedControlDigits;

  if (sum < 100) {
    calculatedControlDigits = sum;
  } else if (sum === 100 || sum === 101) {
    calculatedControlDigits = 0;
  } else {
    const remainder = sum % 101;
    if (remainder === 100) {
      calculatedControlDigits = 0;
    } else {
      calculatedControlDigits = remainder;
    }
  }

  return calculatedControlDigits === controlDigitsInput;
}

export const applySnilsMask = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, '');
  let maskedValue = '';

  if (value.length > 0) {
    maskedValue += value.slice(0, 3);
  }
  if (value.length > 3) {
    maskedValue += `-${value.slice(3, 6)}`;
  }
  if (value.length > 6) {
    maskedValue += `-${value.slice(6, 9)}`;
  }
  if (value.length > 9) {
    maskedValue += ` ${value.slice(9, 11)}`;
  }

  input.value = maskedValue;
};
