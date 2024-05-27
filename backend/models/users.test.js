const db = require("../db");
const User = require("./user");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const {
  commonBeforeAll,
  commonAfterAll,
  commonBeforeEach,
  commonAfterEach,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("find All", () => {
  test("should retrieve all users", async () => {
    const users = await User.findAll();
    expect(users).toEqual([
      {
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "u1@email.com",
        role: "admin",
      },
      {
        username: "u2",
        firstName: "U2F",
        lastName: "U2L",
        email: "u2@email.com",
        role: "teacher",
      },
    ]);
  });
});

describe("get User", () => {
  test("should retrive single user", async () => {
    const user = await User.get("u1");
    expect(user).toEqual({
      username: "u1",
      firstName: "U1F",
      lastName: "U1L",
      email: "u1@email.com",
      role: "admin",
    });
  });

  test("should get not found Error", async () => {
    try {
      const user = await User.get("test");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe("register user", () => {
  test("should register user", async () => {
    const newUser = {
      username: "u3",
      firstName: "U3F",
      lastName: "U3L",
      email: "u3@email.com",
      role: "teacher",
    };

    const resp = await User.register({ ...newUser, password: "1234" });

    expect(newUser).toEqual(resp);
  });

  test("should check duplicate", async () => {
    try {
      const newUser = {
        username: "u1",
        firstName: "U3F",
        lastName: "U3L",
        email: "u3@email.com",
        role: "teacher",
      };
      await User.register({ ...newUser, password: "1234" });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

describe("authenticate user", () => {
  test("should authenticate user", async () => {
    const user = await User.authenticate({
      username: "u1",
      password: "password1",
    });
    expect(user).toEqual({
      username: "u1",
      firstName: "U1F",
      lastName: "U1L",
      email: "u1@email.com",
      role: "admin",
    });
  });

  test("should throw UnauthorizedError when password is not matched", async () => {
    try {
      await User.authenticate({
        username: "u1",
        password: "pass1",
      });
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

describe("remove users", () => {
  test("works", async function () {
    await User.remove("u1");
    const res = await db.query("SELECT * FROM users WHERE username='u1'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such user", async function () {
    try {
      await User.remove("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe("update users", () => {
  test("should update user", async () => {
    const user = await User.update("u2", { lastName: "U2L" });
    expect(user.lastName).toBe("U2L");
  });

  test("should return not found", async () => {
    try {
      await User.update("non Exist", { lastName: "U2L" });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("should return duplicate", async () => {
    try {
      await User.update("u2", { username: "u2", lastName: "U2L" });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});
