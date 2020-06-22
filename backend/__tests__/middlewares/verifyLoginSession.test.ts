import { verifyLoginSession } from "../../src/middlewares/verifyLoginSession";
import { mockResponse, mockNextFn } from "../mocks";

import { response } from "../../src/utils/response.util";
jest.mock("../../src/utils/response.util");

describe("verifyLoginSession()", () => {
  afterEach(() => {
    mockResponse.status.mockClear();
    mockResponse.send.mockClear();
    mockNextFn.mockClear();
    jest.resetModules();
  });

  describe("No login verification required scenarios", () => {
    describe("request method is POST and request path is /users/signup", () => {
      const mockRequest: any = {
        method: "POST",
        path: "/users/signup",
      };

      it("expect next fn to be called", () => {
        verifyLoginSession(mockRequest, mockRequest, mockNextFn);
        expect(mockNextFn).toHaveBeenCalled();
      });
    });

    describe("request method is POST and request path is /users/signin", () => {
      const mockRequest: any = {
        method: "POST",
        path: "/users/signin",
      };

      it("expect next fn to be called", () => {
        verifyLoginSession(mockRequest, mockRequest, mockNextFn);
        expect(mockNextFn).toHaveBeenCalled();
      });
    });

    describe("request method is OPTIONS and request path is /users/signup", () => {
      const mockRequest: any = {
        method: "OPTIONS",
        path: "/users/signup",
      };

      it("expect next fn to be called", () => {
        verifyLoginSession(mockRequest, mockRequest, mockNextFn);
        expect(mockNextFn).toHaveBeenCalled();
      });
    });

    describe("request method is OPTIONS and request path is /users/signin", () => {
      const mockRequest: any = {
        method: "OPTIONS",
        path: "/users/signin",
      };

      it("expect next fn to be called", () => {
        verifyLoginSession(mockRequest, mockRequest, mockNextFn);
        expect(mockNextFn).toHaveBeenCalled();
      });
    });
  });

  describe("Login verification required scenarios", () => {
    const requestRequiresLoginVerification = {
      path: "/users/signin",
      method: "GET",
    };

    describe("Request session is present", () => {
      const mockRequest: any = {
        ...requestRequiresLoginVerification,
        session: {
          alive: true,
        },
      };

      it("expect next fn to be called", () => {
        verifyLoginSession(mockRequest, mockResponse, mockNextFn);
        expect(mockNextFn).toHaveBeenCalled();
      });
    });

    describe("Request session is not present", () => {
      const mockRequest: any = {
        ...requestRequiresLoginVerification,
        session: {},
      };

      it("expect response util to be called with correct params", () => {
        verifyLoginSession(mockRequest, mockResponse, mockNextFn);
        expect(response).toHaveBeenCalledWith(mockResponse, 401, {
          success: false,
          errors: [{ message: "Invalid login session, please login" }],
        });
      });
    });
  });
});
