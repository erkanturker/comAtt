const Joi = require("joi");

const createStudentSchema = Joi.object({
  groupId: Joi.number().integer().required(),
  firstName: Joi.string().max(255).required(),
  lastName: Joi.string().max(255).required(),
  age: Joi.number().integer().min(0).optional(),
  parentFirstName: Joi.string().max(255).required(),
  parentLastName: Joi.string().max(255).required(),
  parentPhone: Joi.string().max(15).required(),
  parentEmail: Joi.string().email().required(),
});

const updateStudentSchema = Joi.object({
  groupId: Joi.number().integer().optional(),
  firstName: Joi.string().max(255).optional(),
  lastName: Joi.string().max(255).optional(),
  age: Joi.number().integer().min(0).optional(),
  parentFirstName: Joi.string().max(255).optional(),
  parentLastName: Joi.string().max(255).optional(),
  parentPhone: Joi.string().max(15).optional(),
  parentEmail: Joi.string().email().optional(),
});

module.exports = {
  createStudentSchema,
  updateStudentSchema,
};
