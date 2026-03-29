import { FormValidator } from '../../src/core/FormValidator.js';

describe('FormValidator', () => {
  let validator;

  beforeEach(() => {
    validator = new FormValidator();
  });

  it('should add a rule', () => {
    validator.addRule('email', 'email');
    expect(validator.rules.email).toEqual([{ rule: 'email', options: {} }]);
  });

  it('should set a custom validator', () => {
    const customValidator = (value) => value === 'custom';
    validator.setCustomValidator('custom', customValidator);
    expect(validator.customValidators.custom).toBe(customValidator);
  });

  it('should validate a field successfully', async () => {
    validator.addRule('email', 'email');
    const isValid = await validator.validateField('email', 'test@example.com');
    expect(isValid).toBe(true);
    expect(validator.errors.email).toEqual([]);
  });

  it('should invalidate a field', async () => {
    validator.addRule('email', 'email');
    const isValid = await validator.validateField('email', 'test');
    expect(isValid).toBe(false);
    expect(validator.errors.email).toEqual(['The email field must be a valid email address.']);
  });

  it('should validate a form successfully', async () => {
    validator.addRule('email', 'email');
    validator.addRule('password', 'password');
    const form = {
      email: 'test@example.com',
      password: 'Password123!',
    };
    const isValid = await validator.validateForm(form);
    expect(isValid).toBe(true);
  });

  it('should invalidate a form', async () => {
    validator.addRule('email', 'email');
    validator.addRule('password', 'password');
    const form = {
      email: 'test',
      password: 'password',
    };
    const isValid = await validator.validateForm(form);
    expect(isValid).toBe(false);
    expect(validator.errors.email).toEqual(['The email field must be a valid email address.']);
    expect(validator.errors.password).toEqual(['The password is not strong enough.']);
  });

  it('should use a custom validator', async () => {
    const customValidator = (value) => value === 'custom';
    validator.setCustomValidator('custom', customValidator);
    validator.addRule('customField', 'custom');
    const isValid = await validator.validateField('customField', 'custom');
    expect(isValid).toBe(true);
  });
});
