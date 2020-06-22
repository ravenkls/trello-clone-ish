import { generateValidateDtoMiddleware } from "../../src/middlewares/generateValidateDtoMiddleware";
import Joi = require("@hapi/joi");
import { mockResponse, mockNextFn } from "../mocks";

import { response } from "../../src/utils/response.util";
jest.mock("../../src/utils/response.util");
const usernameAndEmailDTO: Joi.ObjectSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
});

const validateDtoMiddleware = generateValidateDtoMiddleware(
  usernameAndEmailDTO,
);

describe("generateValidateDtoMiddleware()", () => {
  afterEach(() => {
    mockResponse.status.mockClear();
    mockResponse.send.mockClear();
    mockNextFn.mockClear();
    jest.resetModules();
  });

  describe("Request body has correctly formed data", () => {
    const mockRequest: any = {
      body: {
        username: "username",
        email: "example@email.com",
      },
    };

    it("expect next fn to be called", () => {
      validateDtoMiddleware(mockRequest, mockResponse, mockNextFn);

      expect(mockNextFn).toHaveBeenCalledWith();
    });
  });

  describe("Request contains no body", () => {
    const mockRequest: any = {
      body: {},
    };

    it("expect response util to be called with correct params", () => {
      validateDtoMiddleware(mockRequest, mockResponse, mockNextFn);

      expect(response).toHaveBeenCalledWith(mockResponse, 400, {
        success: false,
        errors: [{ message: "malformed request body" }],
      });
    });
  });

  describe("Request body is malformed", () => {
    const mockRequest: any = {
      body: {
        foo: "username",
        email: "thisisntanemail",
      },
    };

    it("expect response util to be called with correct params", () => {
      validateDtoMiddleware(mockRequest, mockResponse, mockNextFn);

      expect(response).toHaveBeenCalledWith(mockResponse, 400, {
        success: false,
        errors: [{ message: "malformed request body" }],
      });
    });
  });
});
