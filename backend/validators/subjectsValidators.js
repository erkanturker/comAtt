const Joi = require("joi");

const createSubjectSchema = Joi.object({
  subjectName: Joi.string().max(100).required(),
  teacherId: Joi.string().required(),
});

const updateSubjectSchema = Joi.object({
  subjectName: Joi.string().max(100).optional(),
  teacherId: Joi.string().optional(),
});

module.exports = { createSubjectSchema, updateSubjectSchema };
