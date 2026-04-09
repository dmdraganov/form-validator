import {
  validateFileSize,
  validateFileExtension,
  validateMimeType,
} from "../features/fileValidation.js";
import { validateInn } from "../features/innValidation.js";
import { validateSnils } from "../features/snilsValidation.js";

export const email = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const phone = (value: string): boolean => {
  if (typeof value !== "string") return false;

  if (/[^0-9+\-\s()]/.test(value)) {
    return false;
  }

  const hasPlus = value.trim().startsWith("+");
  const normalized = (hasPlus ? "+" : "") + value.replace(/\D/g, "");

  return /^\+[1-9]\d{9,14}$/.test(normalized);
};

interface PasswordOptions {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSymbols?: boolean;
}

export const password = (
  value: string,
  options: PasswordOptions = {},
): boolean => {
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

export const url = (value: string): boolean => {
  return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?.*)?$/.test(
    value,
  );
};

interface DateOptions {
  format?: string;
}

export const date = (value: string, options: DateOptions = {}): boolean => {
  const { format = "YYYY-MM-DD" } = options;
  const parts = value.split(/[-/.]/);
  const formatParts = format.split(/[-/.]/);
  const dateObj: { [key: string]: number } = {};

  if (parts.length !== formatParts.length) {
    return false;
  }

  for (let i = 0; i < formatParts.length; i++) {
    dateObj[formatParts[i]] = parseInt(parts[i], 10);
  }

  const d = new Date(dateObj.YYYY, dateObj.MM - 1, dateObj.DD);
  return d && d.getMonth() + 1 === dateObj.MM;
};

interface FileOptions {
  maxSize?: number;
  allowedExtensions?: string[];
  allowedMimeTypes?: string[];
}

export const file = (file: File, options: FileOptions = {}): boolean => {
  const { maxSize, allowedExtensions, allowedMimeTypes } = options;

  if (maxSize && !validateFileSize(file, maxSize)) {
    return false;
  }
  if (allowedExtensions && !validateFileExtension(file, allowedExtensions)) {
    return false;
  }
  if (allowedMimeTypes && !validateMimeType(file, allowedMimeTypes)) {
    return false;
  }

  return true;
};

export const inn = (value: string): boolean => {
  return validateInn(value);
};

export const snils = (value: string): boolean => {
  return validateSnils(value);
};
