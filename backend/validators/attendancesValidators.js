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

const periodAttendance = Joi.object({
  date: Joi.date().required(),
  attendances: Joi.array()
    .items(
      Joi.object({
        studentId: Joi.number().integer().required(),
        status: Joi.boolean().required(),
      }).required()
    )
    .required(),
});

module.exports = {
  createAttendanceSchema,
  updateAttendanceSchema,
  periodAttendance,
};
