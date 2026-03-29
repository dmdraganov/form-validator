export const calculatePasswordStrength = (password) => {
  const strengthPoints = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  return strengthPoints.reduce((acc, curr) => acc + (curr ? 1 : 0), 0);
};
