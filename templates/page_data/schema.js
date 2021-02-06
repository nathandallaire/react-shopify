const Joi = require("joi");

const pageDataSchema = Joi.object({
  key: Joi.string().required(),
  externalScripts: Joi.array(),
  data: Joi.string(),
  sectionPrefix: Joi.string().max(3),
  sections: Joi.array().items(
    Joi.object({
      section: Joi.string().required(),
      global: Joi.boolean(),
    })
  ),
}).required();

module.exports = pageDataSchema;
