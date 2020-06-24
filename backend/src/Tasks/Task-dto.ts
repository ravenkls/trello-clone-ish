import Joi = require("@hapi/joi");

export const createTaskDto: Joi.ObjectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const updateTaskDto: Joi.ObjectSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  status: Joi.string().valid("OPEN", "IN_PROGRESS", "CLOSED"),
}).min(1);
