import { FormValidator } from '../../src/core/FormValidator';

describe('Localization', () => {
  it('should return English error messages by default', async () => {
    const validator = new FormValidator();
    validator.addRule('email', 'email');
    await validator.validateField('email', 'test');
    expect(validator.errors.email[0]).toBe('The email field must be a valid email address.');
  });

  it('should return Russian error messages when locale is set to "ru"', async () => {
    const validator = new FormValidator({}, {}, 'ru');
    validator.addRule('email', 'email');
    await validator.validateField('email', 'test');
    expect(validator.errors.email[0]).toBe('Поле email должно быть валидным email адресом.');
  });

  it('should be possible to switch locale dynamically', async () => {
    const validator = new FormValidator();
    validator.addRule('email', 'email');
    await validator.validateField('email', 'test');
    expect(validator.errors.email[0]).toBe('The email field must be a valid email address.');

    validator.setLocale('ru');
    await validator.validateField('email', 'test');
    expect(validator.errors.email[0]).toBe('Поле email должно быть валидным email адресом.');
  });
});
