import { User } from "../src/entities/User.entity";
import bcrypt = require("bcryptjs");

test("hashPassword()", async () => {
  const user: User = new User();
  user.password = "cantthinkofagoodpassword";
  user.salt = "$2a$10$gvQa7Q8HRXffWtiHorwgl.";

  jest.spyOn(bcrypt, "hash");
  await user.hashPassword();

  expect(bcrypt.hash).toBeCalledWith("cantthinkofagoodpassword", user.salt);
});
