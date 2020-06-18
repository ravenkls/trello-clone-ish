import express = require("express");
import Joi = require("@hapi/joi");
import { response } from "../utils/response.util";

// DTO must be curried into a returned arrow fn as express only accepts middleware with the req, res, next fn signature
export const validateDto = (DTO: Joi.ObjectSchema) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): express.Response | void => {
    const { error } = DTO.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return response(res, 400, {
        success: false,
        error: { message: "malformed request body" },
      });
    }

    next();
  };
};
