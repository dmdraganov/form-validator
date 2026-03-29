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
