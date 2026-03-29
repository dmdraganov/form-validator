import * as validators from './validators.js';
import { setLocale as setLocalizationLocale, getMessage } from '../features/localization.js';

export class FormValidator {
  constructor(rules = {}, customValidators = {}, locale = 'en') {
    this.rules = rules;
    this.customValidators = customValidators;
    this.errors = {};
    this.setLocale(locale);
  }

  setLocale(locale) {
    setLocalizationLocale(locale);
  }

  addRule(field, rule, options = {}) {
    if (!this.rules[field]) {
      this.rules[field] = [];
    }
    this.rules[field].push({ rule, options });
  }

  setCustomValidator(name, validator) {
    this.customValidators[name] = validator;
  }

  async validateField(field, value) {
    this.errors[field] = [];
    const fieldRules = this.rules[field];

    if (!fieldRules) {
      return true;
    }

    for (const { rule, options } of fieldRules) {
      const validator = this.customValidators[rule] || validators[rule];
      if (validator) {
        const isValid = await validator(value, options);
        if (!isValid) {
          this.errors[field].push(getMessage(rule));
        }
      }
    }

    return this.errors[field].length === 0;
  }

  async validateForm(form) {
    this.errors = {};
    const fields = Object.keys(this.rules);
    for (const field of fields) {
      const value = form[field];
      await this.validateField(field, value);
    }

    return Object.values(this.errors).every(fieldErrors => fieldErrors.length === 0);
  }
}
