const Joi = require("joi");

const pageDataSchema = Joi.object({
  key: Joi.string().required(),
  externalScripts: Joi.array(),
  data: Joi.string(),
}).required();

module.exports = pageDataSchema;
