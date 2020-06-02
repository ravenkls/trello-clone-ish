import { validateDto } from "../src/middlewares/validateDto";
import { authCredentialsDto } from "../src/Users/userCredentials.dto";

let mockReq: any = {};
let mockRes: any = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
};
let mockNextFn: any = jest.fn();

const VALID_USERNAME = "amrittalwar1999";
const VALID_PASSWORD = "iamtypingapassword";

const injectableValidateDtoFn = validateDto(authCredentialsDto);

describe("Post body contains valid dto", () => {
  mockReq = {
    body: {
      username: VALID_USERNAME,
      password: VALID_PASSWORD,
    },
  };

  injectableValidateDtoFn(mockReq, mockReq, mockNextFn);

  test("Expect next function to be called", () => {
    expect(mockNextFn).toHaveBeenCalled();
  });
});

describe("Post body contains invalid dto", () => {
  mockReq = {
    body: {
      username: "",
      password: "",
    },
  };

  injectableValidateDtoFn(mockReq, mockRes, mockNextFn);

  test("Expect a response with status 400 to be sent", () => {
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.status().send).toHaveBeenCalled();
  });
});
