import Joi from 'joi';

export default Joi.object({
  name: Joi.string().required().trim().lowercase(),
  email: Joi.string().required().email().max(255).trim().lowercase(),
  password: Joi.string().required().min(6).max(60)
});
