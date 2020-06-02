import { verifyJwtToken } from "../src/middlewares/verifyJwtToken";
import jwt = require("jsonwebtoken");

const VALID_JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.fprDDa-zFOlNK260Yd8uA_JEOLJ9ctF3NmFz2IdoUFo";
const INVALID_JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyf.fprDDa-zFOlNK260Yd8uA_JEOLJ9ctF3NmFz2IdoUFo";

let mockReq: any = {};
let mockRes: any = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
};
let mockNextFn: any = jest.fn();

jest.spyOn(jwt, "verify");

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

  verifyJwtToken(mockReq, mockRes, mockNextFn);

  expect(jwt.verify).toHaveBeenCalledWith(
    mockReq.headers.authorization,
    process.env.JWT_SECRETKEY,
  );
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
