import express from "express";
import { responseInterface } from "../interfaces/response";

export const response = (
  res: express.Response,
  statusCode: number,
  json: responseInterface,
): express.Response => {
  return res.status(statusCode).send(json);
};
