import { applyPhoneMask, applyCreditCardMask, applyDateMask } from '../../src/features/inputMasks';

describe('Input Masks', () => {
  describe('applyPhoneMask', () => {
    it('should apply a phone mask to a string', () => {
      const event = {
        target: {
          value: '79991234567',
        },
      } as unknown as Event;
      applyPhoneMask(event);
      expect((event.target as HTMLInputElement).value).toBe('+7(999)123-45-67');
    });

    it('should handle partial input', () => {
      const event = {
        target: {
          value: '7999',
        },
      } as unknown as Event;
      applyPhoneMask(event);
      expect((event.target as HTMLInputElement).value).toBe('+7(999');
    });
  });

  describe('applyCreditCardMask', () => {
    it('should apply a credit card mask to a string', () => {
      const event = {
        target: {
          value: '1234567890123456',
        },
      } as unknown as Event;
      applyCreditCardMask(event);
      expect((event.target as HTMLInputElement).value).toBe('1234-5678-9012-3456');
    });

    it('should handle partial input', () => {
      const event = {
        target: {
          value: '12345678',
        },
      } as unknown as Event;
      applyCreditCardMask(event);
      expect((event.target as HTMLInputElement).value).toBe('1234-5678');
    });
  });

  describe('applyDateMask', () => {
    it('should apply a date mask (YYYY-MM-DD) to a string', () => {
      const event = {
        target: {
          value: '20241225',
        },
      } as unknown as Event;
      applyDateMask(event);
      expect((event.target as HTMLInputElement).value).toBe('2024-12-25');
    });

    it('should handle partial date input', () => {
      const event = {
        target: {
          value: '202401',
        },
      } as unknown as Event;
      applyDateMask(event);
      expect((event.target as HTMLInputElement).value).toBe('2024-01');
    });
  });
});
