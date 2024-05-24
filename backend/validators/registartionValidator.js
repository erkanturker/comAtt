const Joi = require("joi");

const registrationSchema = Joi.object({
  username: Joi.string().max(25).required(),
  password: Joi.string().min(5).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("admin", "teacher").required(),
});

module.exports = registrationSchema;
