import validator from 'validator';

export default (values) => {
  const errors = {};
  if (typeof values.email === 'string' && !validator.isEmail(values.email)) {
    errors.email = 'email address must be valid';
  }
  if (values.email && values.email.length > 255) {
    errors.email = 'email address cannot be longer than 255 characters';
  }
  if (values.password && values.password.length < 6) {
    errors.password = 'password must be at least 6 characters long';
  }
  Object.keys(values).map((key) => {
    if (values[key] === '') {
      errors[key] = `${key} is required`;
    }
  });
  return errors;
};
