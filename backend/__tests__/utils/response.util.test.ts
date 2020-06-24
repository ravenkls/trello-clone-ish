import { response } from "../../src/utils/response-util";

describe("Inputting express response, status code and response JSON", () => {
  const responseJSON: any = { foo: "bar" };
  const mockRes: any = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  const statusCode = 200;

  it("expect response methods to be called with the correct params", () => {
    response(mockRes, statusCode, responseJSON);

    expect(mockRes.status).toHaveBeenCalledWith(statusCode);
    expect(mockRes.send).toHaveBeenCalledWith(responseJSON);
  });
});
