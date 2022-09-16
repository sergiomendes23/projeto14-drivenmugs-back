import joi from 'joi';

const userSchema = joi.object({
  name: joi.string().required().trim(),
  email: joi.string().email().required().trim(),
  password: joi.string().required().min(8).max(30)
});

const loginSchema = joi.object({
  email: joi.string().email().required().trim(),
  password: joi.string().required().min(8).max(30)
});

export { userSchema, loginSchema };