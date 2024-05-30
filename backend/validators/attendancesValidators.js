const Joi = require("joi");

const createAttendanceSchema = Joi.object({
  studentId: Joi.number().integer().required(),
  periodId: Joi.number().integer().required(),
  date: Joi.date().required(),
  status: Joi.boolean().required(),
});

const updateAttendanceSchema = Joi.object({
  studentId: Joi.number().integer(),
  periodId: Joi.number().integer(),
  date: Joi.date(),
  status: Joi.boolean(),
});

module.exports = { createAttendanceSchema, updateAttendanceSchema };
