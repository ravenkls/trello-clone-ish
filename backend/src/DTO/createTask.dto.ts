import Joi = require("@hapi/joi");

export const createTaskDto = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});
