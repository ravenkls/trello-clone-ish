import Joi = require("@hapi/joi");

export const createUserDto: Joi.ObjectSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "Invalid type, username must be a string",
    "string.empty": "Please enter your username",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Invalid type, e-mail must be a string",
    "string.empty": "Please enter your email",
  }),
  password: Joi.string().required().messages({
    "string.base": "Invalid type, password must be a string",
    "string.empty": "Please enter your password",
  }),
});

export const signinDto: Joi.ObjectSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "Invalid type, username must be a string",
    "string.empty": "Please enter your username",
  }),
  password: Joi.string().required().messages({
    "string.base": "Invalid type, password must be a string",
    "string.empty": "Please enter your password",
  }),
});

export const updateUserDto: Joi.ObjectSchema = Joi.object({
  username: Joi.string().messages({
    "string.base": "Invalid type, username must be a string",
    "string.empty": "Please enter your username",
  }),
  email: Joi.string().email().messages({
    "string.base": "Invalid type, e-mail must be a string",
    "string.empty": "Please enter your email",
  }),
  password: Joi.string().messages({
    "string.base": "Invalid type, password must be a string",
    "string.empty": "Please enter your password",
  }),
}).min(1);
