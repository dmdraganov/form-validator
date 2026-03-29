import { FormValidator } from '../core/FormValidator';

export class DependentFields {
  private validator: FormValidator;
  private dependencies: { [key: string]: string[] } = {};

  constructor(validator: FormValidator) {
    this.validator = validator;
  }

  addDependency(field: string, dependsOn: string): void {
    if (!this.dependencies[dependsOn]) {
      this.dependencies[dependsOn] = [];
    }
    this.dependencies[dependsOn].push(field);
  }

  fieldChanged(fieldName: string, form: { [key: string]: any }): void {
    const fieldsToValidate = this.dependencies[fieldName];
    if (fieldsToValidate) {
      fieldsToValidate.forEach((field) => {
        this.validator.validateField(field, form[field]);
      });
    }
  }
}
