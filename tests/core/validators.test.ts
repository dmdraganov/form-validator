import { email, phone, password, url, date } from '../../src/core/validators';

describe('Validators', () => {
  describe('email', () => {
    it('should return true for valid emails', () => {
      expect(email('test@example.com')).toBe(true);
      expect(email('test.test@example.co.uk')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(email('test@example')).toBe(false);
      expect(email('test@.com')).toBe(false);
      expect(email('@example.com')).toBe(false);
      expect(email('test')).toBe(false);
    });
  });

  describe('phone', () => {
    it('should return true for valid phone numbers', () => {
      expect(phone('+1234567890')).toBe(true);
      expect(phone('+123456789012345')).toBe(true);
    });

    it('should return false for invalid phone numbers', () => {
      expect(phone('1234567890')).toBe(false);
      expect(phone('+1234567890a')).toBe(false);
      expect(phone('+')).toBe(false);
    });
  });

  describe('password', () => {
    it('should return true for valid passwords', () => {
      expect(password('Password123!')).toBe(true);
    });

    it('should return false for invalid passwords', () => {
      expect(password('password')).toBe(false);
      expect(password('Password')).toBe(false);
      expect(password('Password123')).toBe(false);
    });
  });

  describe('url', () => {
    it('should return true for valid urls', () => {
      expect(url('http://example.com')).toBe(true);
      expect(url('https://example.com')).toBe(true);
      expect(url('https://www.example.com/path?query=value')).toBe(true);
    });

    it('should return false for invalid urls', () => {
      expect(url('test')).toBe(false);
    });
  });

  describe('date', () => {
    it('should return true for valid dates', () => {
      expect(date('2024-03-29', { format: 'YYYY-MM-DD' })).toBe(true);
      expect(date('29/03/2024', { format: 'DD/MM/YYYY' })).toBe(true);
    });

    it('should return false for invalid dates', () => {
      expect(date('2024-29-03', { format: 'YYYY-MM-DD' })).toBe(false);
      expect(date('29-33-2024', { format: 'DD/MM/YYYY' })).toBe(false);
    });
  });
});
