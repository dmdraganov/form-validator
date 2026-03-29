import * as validators from './validators';
import { setLocale as setLocalizationLocale, getMessage } from '../features/localization';

type Validator = (value: any, options?: any) => boolean | Promise<boolean>;

interface Rule {
  rule: string;
  options?: any;
}

interface Rules {
  [key: string]: Rule[];
}

interface CustomValidators {
  [key: string]: Validator;
}

interface Errors {
  [key: string]: string[];
}

export class FormValidator {
  private rules: Rules;
  private customValidators: CustomValidators;
  public errors: Errors;

  constructor(rules: Rules = {}, customValidators: CustomValidators = {}, locale = 'en') {
    this.rules = rules;
    this.customValidators = customValidators;
    this.errors = {};
    this.setLocale(locale);
  }

  setLocale(locale: string): void {
    setLocalizationLocale(locale);
  }

  addRule(field: string, rule: string, options: any = {}): void {
    if (!this.rules[field]) {
      this.rules[field] = [];
    }
    this.rules[field].push({ rule, options });
  }

  setCustomValidator(name: string, validator: Validator): void {
    this.customValidators[name] = validator;
  }

  async validateField(field: string, value: any): Promise<boolean> {
    this.errors[field] = [];
    const fieldRules = this.rules[field];

    if (!fieldRules) {
      return true;
    }

    for (const { rule, options } of fieldRules) {
      const validator = this.customValidators[rule] || (validators as any)[rule];
      if (validator) {
        const isValid = await validator(value, options);
        if (!isValid) {
          this.errors[field].push(getMessage(rule));
        }
      }
    }

    return this.errors[field].length === 0;
  }

  async validateForm(form: { [key: string]: any }): Promise<boolean> {
    this.errors = {};
    const fields = Object.keys(this.rules);
    for (const field of fields) {
      const value = form[field];
      await this.validateField(field, value);
    }

    return Object.values(this.errors).every(fieldErrors => fieldErrors.length === 0);
  }
}
