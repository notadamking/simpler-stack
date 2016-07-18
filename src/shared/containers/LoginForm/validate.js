import Joi from 'joi';

export const LoginFormSchema = Joi.object({
  email: Joi.string().email().required().max(255).trim().lowercase(),
  password: Joi.string().required().min(6).max(60)
});
