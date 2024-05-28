const Joi = require("joi");

const createTermSchema = Joi.object({
  termId: Joi.number().integer().optional(),
  termName: Joi.string().max(50).required(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
});

module.exports = { createTermSchema };
