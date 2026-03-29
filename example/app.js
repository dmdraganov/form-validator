import {
  FormValidator,
  applyPhoneMask,
  applyDateMask,
  applyInnMask,    // Import applyInnMask
  applySnilsMask,  // Import applySnilsMask
  DependentFields,
} from "../dist/index.js"; // Import from compiled library

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const passwordInput = document.getElementById("password");
  const passwordConfirmInput = document.getElementById("password-confirm");
  const innInput = document.getElementById("inn");
  const snilsInput = document.getElementById("snils");
  const dateInput = document.getElementById("date");
  const successMessage = document.getElementById("success-message");

  const getErrorElement = (id) => document.getElementById(`${id}-error`);

  const validator = new FormValidator();

  validator.addRule("email", "email");
  validator.addRule("phone", "phone");
  validator.addRule("password", "password", {
    minLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSymbols: true,
  });
  validator.addRule("password-confirm", "required"); // Ensure it's not empty
  validator.setCustomValidator(
    "passwordMatch",
    (value, options) => value === options.passwordField.value,
  );
  validator.addRule("password-confirm", "passwordMatch", {
    passwordField: passwordInput,
  });
  validator.addRule("inn", "inn");
  validator.addRule("snils", "snils");
  validator.addRule("date", "date", { format: 'YYYY-MM-DD' });

  const dependentFields = new DependentFields(validator);
  dependentFields.addDependency("password-confirm", "password");

  // Apply input masks
  phoneInput.addEventListener("input", applyPhoneMask);
  dateInput.addEventListener("input", applyDateMask);
  innInput.addEventListener("input", applyInnMask);      // Apply INN mask
  snilsInput.addEventListener("input", applySnilsMask);  // Apply SNILS mask

  // Handle real-time validation for a better UX
  const inputs = [
    emailInput,
    phoneInput,
    passwordInput,
    passwordConfirmInput,
    innInput,
    snilsInput,
    dateInput,
  ];
  inputs.forEach((input) => {
    input.addEventListener("input", async () => {
      const fieldName = input.name;
      const isValid = await validator.validateField(fieldName, input.value);
      const errorElement = getErrorElement(fieldName);
      if (!isValid) {
        errorElement.textContent = validator.errors[fieldName].join(", ");
      } else {
        errorElement.textContent = "";
      }

      dependentFields.fieldChanged(fieldName, {
        password: passwordInput.value,
        "password-confirm": passwordConfirmInput.value,
      });
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    successMessage.textContent = "";

    const formData = {
      email: emailInput.value,
      phone: phoneInput.value,
      password: passwordInput.value,
      "password-confirm": passwordConfirmInput.value,
      inn: innInput.value,
      snils: snilsInput.value,
      date: dateInput.value,
    };

    const isValid = await validator.validateForm(formData);

    inputs.forEach((input) => (getErrorElement(input.name).textContent = ""));

    if (isValid) {
      successMessage.textContent = "Форма успешно отправлена!";
      console.log("Form data:", formData);
      form.reset();
    } else {
      for (const fieldName in validator.errors) {
        const errors = validator.errors[fieldName];
        if (errors.length > 0) {
          getErrorElement(fieldName).textContent = errors.join(", ");
        }
      }
      successMessage.textContent = "Пожалуйста, исправьте ошибки в форме.";
    }
  });
});
