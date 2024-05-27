const Joi = require("joi");

const validateGroupInfo = Joi.object({
  groupName: Joi.string().max(50).required(),
});

module.exports = { validateGroupInfo };
