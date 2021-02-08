const Joi = require("joi");

const pageDataSchema = Joi.object({
  key: Joi.string().required(),
  externalScripts: Joi.array(),
  data: Joi.string(),
  sectionPrefix: Joi.string().max(3),
  lang: Joi.array(),
  sections: Joi.array().items(
    Joi.object({
      section: Joi.string().required(),
      as: Joi.string().max(11).min(2),
    })
  ),
}).required();

module.exports = pageDataSchema;
