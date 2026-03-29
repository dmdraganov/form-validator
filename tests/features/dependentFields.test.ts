import { jest } from '@jest/globals';
import { FormValidator } from '../../src/core/FormValidator';
import { DependentFields } from '../../src/features/dependentFields';

describe('DependentFields', () => {
  it('should trigger validation on a dependent field', async () => {
    const validator = new FormValidator();
    const dependentFields = new DependentFields(validator);

    validator.addRule('password', 'password');
    validator.addRule('passwordConfirmation', 'required');
    validator.setCustomValidator('confirmation', (value: string, options: { target: string }) => {
      return value === options.target;
    });
    validator.addRule('passwordConfirmation', 'confirmation', { target: 'password' });

    dependentFields.addDependency('passwordConfirmation', 'password');

    const form = {
      password: 'Password123!',
      passwordConfirmation: 'Password123!',
    };

    const validateFieldSpy = jest.spyOn(validator, 'validateField');
    dependentFields.fieldChanged('password', form);

    expect(validateFieldSpy).toHaveBeenCalledWith('passwordConfirmation', 'Password123!');
  });
});
