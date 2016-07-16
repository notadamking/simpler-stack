import Joi from 'joi';

export const loginModalSchema = Joi.object({
  email: Joi.string().email().required().max(255).trim().lowercase(),
  password: Joi.string().min(6).max(60)
});
