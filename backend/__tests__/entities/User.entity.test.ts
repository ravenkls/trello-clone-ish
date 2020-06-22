import { User } from "../../src/Users/User.entity";
import bcrypt = require("bcryptjs");

describe("hashPassword()", () => {
  it("expect hashPassword() to hash the user password correctly", async () => {
    const user: User = new User();

    user.password = "cantthinkofagoodpassword";
    user.salt = "$2a$10$gvQa7Q8HRXffWtiHorwgl.";
    jest.spyOn(bcrypt, "hash");

    await user.hashPassword();
    expect(user.password).toEqual(
      "$2a$10$gvQa7Q8HRXffWtiHorwgl.RTSWAwO9W2OB5jesFWF62aJCnsGP3ZG",
    );
  });
});
