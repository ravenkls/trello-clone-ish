import express = require("express");
import Joi = require("@hapi/joi");

// DTO must be curried into a returned arrow fn as express only accepts middleware with the req, res, next fn signature
export const validateDto = (DTO: Joi.ObjectSchema) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { error } = DTO.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).send();
    }

    next();
  };
};
