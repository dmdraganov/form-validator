import { FormValidator } from '../../src/core/FormValidator';

describe('Async Validation', () => {
  it('should handle asynchronous validators', async () => {
    const validator = new FormValidator();

    const asyncValidator = (value: string): Promise<boolean> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(value === 'async');
        }, 10);
      });
    };

    validator.setCustomValidator('async', asyncValidator);
    validator.addRule('asyncField', 'async');

    const isValid = await validator.validateField('asyncField', 'async');
    expect(isValid).toBe(true);

    const isInvalid = await validator.validateField('asyncField', 'not-async');
    expect(isInvalid).toBe(false);
  });
});
