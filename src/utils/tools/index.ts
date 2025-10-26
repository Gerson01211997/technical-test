import { TOKEN_INITIALS } from 'app/api/login/constants';

export const regexValidation = {
  numeric: /^\d+$/,
  decimalNumeric: /^[.\d]+$/,
  lettersSpacesNumbers: /^[A-Za-z\d\s]*$/,
  specialCharacters: /^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s_-]*$/,
  paramsOfUrl: /:([a-zA-Z_]\w*)/g,
  numberInText: /\d+/,
};

export const TOKEN = `${TOKEN_INITIALS}${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
