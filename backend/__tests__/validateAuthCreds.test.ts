import { validateAuthCredentials } from "../src/utils/validateAuthCreds";

let mockReq: any = {};
let mockRes: any = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
};
let mockNextFn: any = jest.fn();

const VALID_USERNAME = "amrittalwar";
const VALID_PASSWORD = "veryvalidpassword1999";

describe("Post body contains valid auth creds structure", () => {
  mockReq = {
    body: {
      username: VALID_USERNAME,
      password: VALID_PASSWORD,
    },
  };

  validateAuthCredentials(mockReq, mockReq, mockNextFn);

  test("Expect next function to be called", () => {
    expect(mockNextFn).toHaveBeenCalled();
  });
});

describe("Post body contains no username and password", () => {
  mockReq = {
    body: {
      username: "",
      password: "",
    },
  };

  validateAuthCredentials(mockReq, mockRes, mockNextFn);

  test("Expect a response with status 400 to be sent", () => {
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.status().send).toHaveBeenCalled();
  });
});
