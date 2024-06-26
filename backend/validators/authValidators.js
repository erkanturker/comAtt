const Joi = require("joi");
//return validation schema for register route
const registrationSchema = Joi.object({
  username: Joi.string().max(25).required(),
  password: Joi.string().min(5).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("admin", "teacher").required(),
});

const updateUserSchema = Joi.object({
  username: Joi.string().max(25),
  password: Joi.string().min(5),
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  role: Joi.string().valid("admin", "teacher"),
});

//return validation schema for token route
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { registrationSchema, loginSchema, updateUserSchema };
