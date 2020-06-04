import { verifyJwtToken } from "../src/middlewares/verifyJwtToken";
import jwt = require("jsonwebtoken");

const VALID_JWT_TOKEN = jwt.sign(
  { userId: 1, username: "amrit" },
  process.env.JWT_SECRETKEY,
  {
    expiresIn: "600s",
  },
);
const INVALID_JWT_TOKEN = jwt.sign(
  { userId: 1, username: "amrit" },
  process.env.JWT_SECRETKEY,
  {
    expiresIn: "0s",
  },
);

let mockReq: any = {};
let mockRes: any = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
};
let mockNextFn: any = jest.fn();

test("Request header does not contain JWT", () => {
  mockReq = {
    headers: {
      authorization: "",
    },
  };

  verifyJwtToken(mockReq, mockRes, mockNextFn);

  expect(mockRes.status).toHaveBeenCalledWith(401);
  expect(mockRes.status().send).toHaveBeenCalled();
});

test("Request header contains valid JWT", () => {
  mockReq = {
    headers: {
      authorization: `${VALID_JWT_TOKEN}`,
    },
    body: {},
  };

  jest.spyOn(jwt, "verify");
  verifyJwtToken(mockReq, mockRes, mockNextFn);

  expect(jwt.verify).toHaveBeenCalledWith(
    mockReq.headers.authorization,
    process.env.JWT_SECRETKEY,
  );

  expect(mockReq.jwtDecode).toEqual({
    userId: 1,
    username: "amrit",
  });

  expect(mockNextFn).toHaveBeenCalled();
});

test("Request header contains invalid JWT", () => {
  mockReq = {
    headers: {
      authorization: `${INVALID_JWT_TOKEN}`,
    },
  };

  verifyJwtToken(mockReq, mockRes, mockNextFn);

  expect(jwt.verify).toHaveBeenCalledWith(
    mockReq.headers.authorization,
    process.env.JWT_SECRETKEY,
  );
  expect(mockRes.status).toHaveBeenCalledWith(401);
  expect(mockRes.status().send).toHaveBeenCalled();
});
