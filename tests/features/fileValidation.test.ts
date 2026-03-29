import { validateFileSize, validateFileExtension, validateMimeType } from '../../src/features/fileValidation';

describe('File Validation', () => {
  const mockFile = (name: string, size: number, type: string): File => {
    return { name, size, type } as File;
  };

  describe('validateFileSize', () => {
    it('should return true if file size is within the limit', () => {
      const file = mockFile('test.jpg', 1024, 'image/jpeg');
      expect(validateFileSize(file, 2048)).toBe(true);
    });

    it('should return false if file size is larger than the limit', () => {
      const file = mockFile('test.jpg', 2048, 'image/jpeg');
      expect(validateFileSize(file, 1024)).toBe(false);
    });
  });

  describe('validateFileExtension', () => {
    it('should return true if file extension is allowed', () => {
      const file = mockFile('test.jpg', 1024, 'image/jpeg');
      expect(validateFileExtension(file, ['jpg', 'png'])).toBe(true);
    });

    it('should return false if file extension is not allowed', () => {
      const file = mockFile('test.gif', 1024, 'image/gif');
      expect(validateFileExtension(file, ['jpg', 'png'])).toBe(false);
    });
  });

  describe('validateMimeType', () => {
    it('should return true if mime type is allowed', () => {
      const file = mockFile('test.jpg', 1024, 'image/jpeg');
      expect(validateMimeType(file, ['image/jpeg', 'image/png'])).toBe(true);
    });

    it('should return false if mime type is not allowed', () => {
      const file = mockFile('test.gif', 1024, 'image/gif');
      expect(validateMimeType(file, ['image/jpeg', 'image/png'])).toBe(false);
    });
  });
});
