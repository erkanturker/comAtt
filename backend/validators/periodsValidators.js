const Joi = require("joi");

const periodSchema = Joi.object({
  periodNumber: Joi.number().integer().required(),
  subjectId: Joi.number().integer().required(),
  groupId: Joi.number().integer().required(),
  termId: Joi.number().integer().required(),
  date: Joi.date().required(),
});

const createPeriodSchema = Joi.alternatives().try(
  periodSchema,
  Joi.array().items(periodSchema)
);

const updatePeriodSchema = Joi.object({
  periodNumber: Joi.number().integer().optional(),
  subjectId: Joi.number().integer().optional(),
  groupId: Joi.number().integer().optional(),
  termId: Joi.number().integer().optional(),
  attendanceTaken: Joi.boolean().optional(),
  date: Joi.date().optional(),
});

module.exports = {
  createPeriodSchema,
  updatePeriodSchema,
};
