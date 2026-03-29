export class DependentFields {
  constructor(validator) {
    this.validator = validator;
    this.dependencies = {};
  }

  addDependency(field, dependsOn) {
    if (!this.dependencies[dependsOn]) {
      this.dependencies[dependsOn] = [];
    }
    this.dependencies[dependsOn].push(field);
  }

  fieldChanged(fieldName, form) {
    const fieldsToValidate = this.dependencies[fieldName];
    if (fieldsToValidate) {
      fieldsToValidate.forEach((field) => {
        this.validator.validateField(field, form[field]);
      });
    }
  }
}
