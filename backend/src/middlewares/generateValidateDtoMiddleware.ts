import express = require("express");
import Joi = require("@hapi/joi");
import { response } from "../utils/response.util";

// DTO must be curried into a returned arrow fn as express only accepts middleware with the req, res, next fn signature
export const generateValidateDtoMiddleware = (DTO: Joi.ObjectSchema) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): express.Response | void => {
    const noReqBody = !Boolean(req.body);
    const { error } = DTO.validate(req.body, {
      abortEarly: false,
    });

    if (error || noReqBody) {
      return response(res, 400, {
        success: false,
        errors: [{ message: "malformed request body" }],
      });
    }

    next();
  };
};
