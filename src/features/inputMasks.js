export const applyPhoneMask = (event) => {
  let input = event.target;
  let value = input.value.replace(/\D/g, '');
  let maskedValue = '+';

  if (value.length > 0) {
    maskedValue += `${value.slice(0, 1)}`;
    if (value.length > 1) {
      maskedValue += `(${value.slice(1, 4)}`;
    }
    if (value.length > 4) {
      maskedValue += `)${value.slice(4, 7)}`;
    }
    if (value.length > 7) {
      maskedValue += `-${value.slice(7, 9)}`;
    }
    if (value.length > 9) {
      maskedValue += `-${value.slice(9, 11)}`;
    }
  }

  input.value = maskedValue;
};
