# Form Validator

Гибкая и мощная библиотека JavaScript для валидации форм.

## Возможности

-   **Встроенные валидаторы:** Набор общих валидаторов, таких как `email`, `phone`, `password`, `url` и `date`.
-   **Пользовательские правила:** Легко добавляйте свои собственные правила валидации.
-   **Асинхронная валидация:** Поддержка валидаторов, возвращающих Promise.
-   **Зависимые поля:** Запускайте валидацию для поля при изменении связанного поля.
-   **Индикатор надежности пароля:** Функция для расчета надежности пароля.
-   **Локализация:** Сообщения об ошибках могут быть переведены на разные языки (по умолчанию поддерживаются английский и русский).
-   **Поддержка TypeScript:** Библиотека написана на TypeScript и включает в себя все необходимые типы.

## Установка

```bash
npm install form-validator
```

## Использование

### Простая валидация

```javascript
import { FormValidator } from 'form-validator';

const validator = new FormValidator();

validator.addRule('email', 'email');
validator.addRule('password', 'password');

const form = {
  email: 'test@example.com',
  password: 'Password123!',
};

validator.validateForm(form).then(isValid => {
  if (isValid) {
    console.log('Форма валидна');
  } else {
    console.log('Форма невалидна', validator.errors);
  }
});
```

### Пользовательские правила

```javascript
import { FormValidator } from 'form-validator';

const validator = new FormValidator();

const customValidator = (value) => value === 'custom';
validator.setCustomValidator('custom', customValidator);
validator.addRule('customField', 'custom');

validator.validateField('customField', 'custom').then(isValid => {
    // ...
});
```

### Локализация

```javascript
import { FormValidator } from 'form-validator';

const validator = new FormValidator({}, {}, 'ru'); // Установить русскую локаль

validator.addRule('email', 'email');

validator.validateField('email', 'test').then(isValid => {
  if (!isValid) {
    console.log(validator.errors.email[0]); // "Поле email должно быть валидным email адресом."
  }
});
```

### Надежность пароля

```javascript
import { calculatePasswordStrength } from 'form-validator';

const strength = calculatePasswordStrength('Password123!'); // 5
```

### Маски ввода

```javascript
import { applyPhoneMask, applyCreditCardMask } from 'form-validator';

const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', applyPhoneMask);

const cardInput = document.getElementById('credit-card');
cardInput.addEventListener('input', applyCreditCardMask);
```

### Валидация СНИЛС

```javascript
import { FormValidator } from 'form-validator';

const validator = new FormValidator();

validator.addRule('snils', 'snils');

validator.validateField('snils', '112-233-445 95').then(isValid => {
  if (isValid) {
    console.log('SNILS is valid');
  } else {
    console.log('SNILS is invalid', validator.errors);
  }
});
```

### Валидация ИНН

```javascript
import { FormValidator } from 'form-validator';

const validator = new FormValidator();

validator.addRule('inn', 'inn');

validator.validateField('inn', '500100732259').then(isValid => {
  if (isValid) {
    console.log('INN is valid');
  } else {
    console.log('INN is invalid', validator.errors);
  }
});
```

### Валидация файлов

```javascript
import { FormValidator } from 'form-validator';

const validator = new FormValidator();

const imageFile = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

validator.addRule('avatar', 'file', {
  maxSize: 1024 * 1024, // 1MB
  allowedExtensions: ['jpg', 'png'],
  allowedMimeTypes: ['image/jpeg', 'image/png'],
});

validator.validateField('avatar', imageFile).then(isValid => {
  if (isValid) {
    console.log('File is valid');
  } else {
    console.log('File is invalid', validator.errors);
  }
});
```

## API

### `FormValidator`

#### `new FormValidator(rules, customValidators, locale)`

-   `rules` (Object): Объект с начальными правилами валидации.
-   `customValidators` (Object): Объект с пользовательскими функциями валидации.
-   `locale` (String): Локаль для сообщений об ошибках (по умолчанию: `'en'`).

#### `addRule(field, rule, options)`

-   `field` (String): Имя поля для валидации.
-   `rule` (String): Имя правила валидации.
-   `options` (Object): Опции для валидатора.

#### `setCustomValidator(name, validator)`

-   `name` (String): Имя пользовательского валидатора.
-   `validator` (Function): Функция валидатора.

#### `validateField(field, value)`

-   `field` (String): Имя поля для валидации.
-   `value` (any): Значение поля.
-   Возвращает `Promise`, который разрешается в boolean.

#### `validateForm(form)`

-   `form` (Object): Объект с данными формы.
-   Возвравращает `Promise`, который разрешается в boolean.

#### `setLocale(locale)`

-   `locale` (String): Устанавливаемая локаль.

### Встроенные валидаторы

-   `email`
-   `phone`
-   `password`
-   `url`
-   `date`
-   `file`
-   `inn`
-   `snils`
-   `required`

### Другие функции

-   `calculatePasswordStrength(password)`
-   `applyPhoneMask(event)`
-   `applyCreditCardMask(event)`
-   `DependentFields`
-   `setLocale(locale)`
