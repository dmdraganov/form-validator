import {
  FormValidator,
  applyPhoneMask,
  applyDateMask,
  applyInnMask,
  applySnilsMask,
  DependentFields,
} from "../dist/index.js";

const testCases = {
  email: [
    {
      value: "user@example.com",
      expected: true,
      description: "Валидный email",
    },
    {
      value: "test.email+tag@domain.co.uk",
      expected: true,
      description: "Email с + и точкой",
    },
    { value: "invalid.email@", expected: false, description: "Без домена" },
    { value: "no-at-sign.com", expected: false, description: "Без @" },
    {
      value: "@nodomain.com",
      expected: false,
      description: "Без имени пользователя",
    },
    {
      value: "spaces in@email.com",
      expected: false,
      description: "Пробелы в email",
    },
    { value: "user@domain", expected: false, description: "Нет расширения" },
    {
      value: "a@b.c",
      expected: true,
      description: "Минимально валидный email",
    },
  ],
  phone: [
    {
      value: "+79991234567",
      expected: true,
      description: "International format",
    },
    { value: "+1-202-555-0173", expected: true, description: "US format" },
    { value: "89991234567", expected: false, description: "Без +" },
    { value: "+7 999 123 45 67", expected: true, description: "С пробелами" },
    {
      value: "+7(999)123-4567",
      expected: true,
      description: "С скобками и дефисом",
    },
    {
      value: "+123456",
      expected: false,
      description: "Слишком короткий номер",
    },
    { value: "abc123def456", expected: false, description: "Буквы в номере" },
    { value: "+44-20-7946-0958", expected: true, description: "UK format" },
  ],
  password: [
    { value: "WeakPass1!", expected: true, description: "Валидный пароль" },
    { value: "Strong@Pass123", expected: true, description: "Сильный пароль" },
    { value: "s1A!", expected: false, description: "Слишком короткий" },
    {
      value: "nouppercase123!",
      expected: false,
      description: "Без заглавных букв",
    },
    {
      value: "NOLOWERCASE123!",
      expected: false,
      description: "Без строчных букв",
    },
    { value: "NoNumbers!", expected: false, description: "Без цифр" },
    { value: "NoSymbols123", expected: false, description: "Без спецсимволов" },
    {
      value: "ValidPass123!!!",
      expected: true,
      description: "Очень сильный пароль",
    },
  ],
  date: [
    { value: "2024-12-25", expected: true, description: "Валидная дата" },
    { value: "2024-02-29", expected: true, description: "Високосный год" },
    { value: "2023-02-29", expected: false, description: "Невисокосный год" },
    { value: "2024-13-01", expected: false, description: "Месяц > 12" },
    { value: "2024-04-31", expected: false, description: "День > 30" },
    { value: "2024-01-01", expected: true, description: "Первый день года" },
    { value: "2024-12-31", expected: true, description: "Последний день года" },
    {
      value: "invalid-date",
      expected: false,
      description: "Невалидный формат",
    },
  ],
  inn: [
    {
      value: "7707083893",
      expected: true,
      description: "Валидный ИНН (10 цифр)",
    },
    {
      value: "500100732259",
      expected: true,
      description: "Валидный ИНН (12 цифр)",
    },
    {
      value: "77-070-838-93",
      expected: true,
      description: "ИНН с маской (10)",
    },
    {
      value: "5001-007322-59",
      expected: true,
      description: "ИНН с маской (12)",
    },
    {
      value: "1234567890",
      expected: false,
      description: "Невалидная контрольная сумма (10)",
    },
    {
      value: "123456789012",
      expected: false,
      description: "Невалидная контрольная сумма (12)",
    },
    { value: "77017017", expected: false, description: "Слишком короткий" },
    {
      value: "770170170001234",
      expected: false,
      description: "Слишком длинный",
    },
  ],
  snils: [
    {
      value: "12345678901",
      expected: false,
      description: "Несуществующий СНИЛС",
    },
    { value: "11223344595", expected: true, description: "Валидный СНИЛС" },
    { value: "112-233-445 95", expected: true, description: "СНИЛС с маской" },
    { value: "100000000", expected: false, description: "Слишком короткий" },
    { value: "123456789012", expected: false, description: "Слишком длинный" },
    { value: "abc12345678", expected: false, description: "Содержит буквы" },
  ],
  url: [
    {
      value: "https://example.com",
      expected: true,
      description: "Обычный HTTPS URL",
    },
    {
      value: "http://www.example.com",
      expected: true,
      description: "HTTP с www",
    },
    { value: "example.com", expected: true, description: "Без протокола" },
    {
      value: "https://example.com/path?query=value",
      expected: true,
      description: "С path и query",
    },
    { value: "not a url", expected: false, description: "Просто текст" },
    { value: "https://", expected: false, description: "Только протокол" },
    {
      value: "ftp://example.com",
      expected: false,
      description: "FTP протокол",
    },
  ],
};

function initializeFormValidator() {
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
  validator.addRule("password-confirm", "required");
  validator.setCustomValidator(
    "passwordMatch",
    (value, options) => value === options.passwordField.value,
  );
  validator.addRule("password-confirm", "passwordMatch", {
    passwordField: passwordInput,
  });
  validator.addRule("inn", "inn");
  validator.addRule("snils", "snils");
  validator.addRule("date", "date", { format: "YYYY-MM-DD" });

  const dependentFields = new DependentFields(validator);
  dependentFields.addDependency("password-confirm", "password");

  phoneInput.addEventListener("input", applyPhoneMask);
  dateInput.addEventListener("input", applyDateMask);
  innInput.addEventListener("input", applyInnMask);
  snilsInput.addEventListener("input", applySnilsMask);

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
    successMessage.classList.remove("show");

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
      successMessage.classList.add("show");
      form.reset();
    } else {
      Object.keys(validator.errors).forEach((fieldName) => {
        const errorElement = getErrorElement(fieldName);
        if (errorElement) {
          errorElement.textContent = validator.errors[fieldName].join(", ");
        }
      });
    }
  });
}

function createTestUI() {
  const validator = new FormValidator();

  validator.addRule("test-email", "email");
  validator.addRule("test-phone", "phone");
  validator.addRule("test-password", "password", {
    minLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSymbols: true,
  });
  validator.addRule("test-date", "date", { format: "YYYY-MM-DD" });
  validator.addRule("test-inn", "inn");
  validator.addRule("test-snils", "snils");
  validator.addRule("test-url", "url");

  Object.entries(testCases).forEach(([validatorType, cases]) => {
    const container = document.getElementById(`${validatorType}-cases`);
    if (!container) return;

    const html = cases
      .map(
        (testCase, index) => `
      <div class="test-case">
        <h4>${testCase.description}</h4>
        <input type="text" class="test-input" value="${testCase.value}" readonly>
        <button class="test-btn" onclick="runTest('${validatorType}', '${testCase.value}', ${testCase.expected}, this)">
          Тест
        </button>
        <div class="test-result"></div>
      </div>
    `,
      )
      .join("");

    container.innerHTML = html;
  });

  window.runTest = async function (validatorType, value, expected) {
    const button = event.target;
    const resultDiv = button.nextElementSibling;

    const tempValidator = new FormValidator();

    switch (validatorType) {
      case "email":
        tempValidator.addRule("test-field", "email");
        break;
      case "phone":
        tempValidator.addRule("test-field", "phone");
        break;
      case "password":
        tempValidator.addRule("test-field", "password", {
          minLength: 8,
          requireUppercase: true,
          requireNumbers: true,
          requireSymbols: true,
        });
        break;
      case "date":
        tempValidator.addRule("test-field", "date", { format: "YYYY-MM-DD" });
        break;
      case "inn":
        tempValidator.addRule("test-field", "inn");
        break;
      case "snils":
        tempValidator.addRule("test-field", "snils");
        break;
      case "url":
        tempValidator.addRule("test-field", "url");
        break;
    }

    const isValid = await tempValidator.validateField("test-field", value);
    const testPassed = isValid === expected;

    resultDiv.classList.add("show");
    resultDiv.classList.remove("pass", "fail");
    resultDiv.classList.add(testPassed ? "pass" : "fail");

    button.classList.remove("success", "error");
    button.classList.add(testPassed ? "success" : "error");

    if (testPassed) {
      resultDiv.textContent = `Тест прошёл! Результат: ${isValid ? "валидно" : "невалидно"}`;
    } else {
      resultDiv.textContent = `Тест не прошёл! Ожидалось: ${
        expected ? "валидно" : "невалидно"
      }, получено: ${isValid ? "валидно" : "невалидно"}`;
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const sections = document.querySelectorAll(".test-section");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tabId = e.target.dataset.tab;

      tabButtons.forEach((b) => b.classList.remove("active"));
      sections.forEach((s) => s.classList.remove("active"));

      e.target.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  createTestUI();
  initializeFormValidator();
});
