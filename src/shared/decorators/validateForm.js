import { reduxForm } from 'redux-form';
import Joi from 'joi';

export const parsedJoiErrors = (error) => {
  if (!error) {
    return {};
  }
  const errors = {};
  const allErrors = error.details;
  for (let i = 0; i < allErrors.length; i++) {
    const curError = allErrors[i];
    if (errors[curError.path]) {
      continue;
    }
    errors[curError.path] = curError.message;
  }
  return errors;
};

export default (options) => {
  const { schema } = options;
  return reduxForm({
    ...options,
    validate: (values) => {
      const results = Joi.validate(values, schema, { abortEarly: false });
      return parsedJoiErrors(results.error);
    }
  });
};
