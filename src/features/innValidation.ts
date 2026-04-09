const getInnControlDigit = (digits: number[], weights: number[]): number => {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    sum += digits[i] * weights[i];
  }
  const controlDigit = sum % 11;
  return controlDigit === 10 ? 0 : controlDigit;
};

export const validateInn = (inn: string): boolean => {
  if (typeof inn !== "string") {
    return false;
  }

  inn = inn.replace(/\D/g, "");

  if (!/^\d+$/.test(inn)) {
    return false;
  }

  const len = inn.length;
  if (len !== 10 && len !== 12) {
    return false;
  }

  const digits = inn.split("").map(Number);

  if (len === 10) {
    const weights10 = [2, 4, 10, 3, 5, 9, 4, 6, 8];
    const calculatedControlDigit = getInnControlDigit(
      digits.slice(0, 9),
      weights10,
    );
    return calculatedControlDigit === digits[9];
  }

  if (len === 12) {
    const weights11 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
    const calculatedD11 = getInnControlDigit(digits.slice(0, 10), weights11);
    if (calculatedD11 !== digits[10]) {
      return false;
    }

    const weights12 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
    const calculatedD12 = getInnControlDigit(digits.slice(0, 11), weights12);
    return calculatedD12 === digits[11];
  }

  return false;
};

export const applyInnMask = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, "");
  let maskedValue = "";

  if (value.length > 10) {
    // If input is longer than 10 digits, assume 12-digit INN format
    // XXXX-XXXXXX-XX
    maskedValue = value.slice(0, 4);
    if (value.length > 4) {
      maskedValue += `-${value.slice(4, 10)}`;
    }
    if (value.length > 10) {
      maskedValue += `-${value.slice(10, 12)}`;
    }
  } else {
    // Assume 10-digit INN format for shorter inputs
    // XX-XXX-XXX-XX
    maskedValue = value.slice(0, 2);
    if (value.length > 2) {
      maskedValue += `-${value.slice(2, 5)}`;
    }
    if (value.length > 5) {
      maskedValue += `-${value.slice(5, 8)}`;
    }
    if (value.length > 8) {
      maskedValue += `-${value.slice(8, 10)}`;
    }
  }

  input.value = maskedValue;
};
