const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const createToken = require("./token");

describe("create token", () => {
  test("should create  token", () => {
    const user = {
      username: "test",
      firstName: "Test",
      lastName: "User",
      email: "testuser@gmail.com",
      role: "admin",
    };

    const token = createToken(user);

    expect(token).toBeTruthy();

    const decoded = jwt.verify(token, SECRET_KEY);

    expect(user.username).toBe(decoded.username);
    expect(user.role).toBe(decoded.role);
  });
});
