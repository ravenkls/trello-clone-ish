import express = require("express");
import Joi = require("@hapi/joi");

const authCredentialsSchema: Joi.ObjectSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "Invalid type, username must be a string",
    "string.empty": "Please enter your username",
  }),
  password: Joi.string().required().messages({
    "string.base": "Invalid type, password must be a string",
    "string.empty": "Please enter your password",
  }),
});

export const validateAuthCredentials = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { error } = authCredentialsSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).send();
  }

  next();
};
