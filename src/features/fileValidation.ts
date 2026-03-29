export const validateFileSize = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize;
};

export const validateFileExtension = (file: File, allowedExtensions: string[]): boolean => {
  const extension = file.name.split('.').pop();
  if (!extension) {
    return false;
  }
  return allowedExtensions.includes(extension);
};

export const validateMimeType = (file: File, allowedMimeTypes: string[]): boolean => {
  return allowedMimeTypes.includes(file.type);
};
