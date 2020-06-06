import Joi = require("@hapi/joi");

export const createUserDto: Joi.ObjectSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "Invalid type, username must be a string",
    "string.empty": "Please enter your username",
  }),
  password: Joi.string().required().messages({
    "string.base": "Invalid type, password must be a string",
    "string.empty": "Please enter your password",
  }),
});
