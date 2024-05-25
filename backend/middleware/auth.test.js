const { authJWT, ensureIsAdmin, ensureCorrectUserOrAdmin } = require("./auth");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");
const { locals } = require("../app");

const user = {
  username: "test",
  firstName: "Test",
  lastName: "User",
  email: "testuser@gmail.com",
  role: "admin",
};

const adminJWT = jwt.sign(user, SECRET_KEY);
const teacherJWT = jwt.sign({ ...user, role: "teacher" }, SECRET_KEY);
const invalidJWT = jwt.sign(user, "invalid");

describe("authJWT", () => {
  test("should add decoded jwt to res locals", () => {
    //mock req,res,next functions
    const req = { headers: { authorization: `Bearer ${adminJWT}` } };
    const res = { locals: {} };
    const next = (err) => {
      expect(err).toBeFalsy();
    };

    authJWT(req, res, next);
    expect(res.locals).toEqual({
      user: {
        username: "test",
        firstName: "Test",
        lastName: "User",
        email: "testuser@gmail.com",
        role: "admin",
        iat: expect.any(Number),
      },
    });
  });
  test("should local has no user object without if not header provided", () => {
    const req = { headers: {} };
    const res = { locals: {} };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    authJWT(req, res, next);
    expect(res.locals).toEqual({});
  });

  test("should not add user if invalid token passed", () => {
    const req = { headers: { authorization: `Bearer ${invalidJWT}` } };
    const res = { locals: {} };
    const next = (err) => {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    authJWT(req, res, next);
    expect(res.locals).toEqual({});
  });
});

describe("ensure Admin logged in", () => {
  test("should pass the middleware ", () => {
    const req = {};
    const res = { locals: { user } };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    ensureIsAdmin(req, res, next);
  });

  test("should return unAuthorized when role is not admin", () => {
    const req = {};
    const res = { locals: { user: { ...user, role: "teacher" } } };
    const next = (err) => {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureIsAdmin(req, res, next);
  });

  test("should return unAuthorized when locals is empty", () => {
    const req = {};
    const res = { locals: {} };
    const next = (err) => {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureIsAdmin(req, res, next);
  });
});

describe("ensure is user or admin", () => {
  test("should work for admin", () => {
    const req = { params: { username: "test" } };
    const res = { locals: { user } };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    ensureCorrectUserOrAdmin(req, res, next);
  });
  test("should work for teacher", () => {
    const req = { params: { username: "test" } };
    const res = { locals: { user: { ...user, role: "teacher" } } };
    const next = (err) => {
      expect(err).toBeFalsy();
    };
    ensureCorrectUserOrAdmin(req, res, next);
  });

  test("should return unauthorized error if username is different for path paramather", () => {
    const req = { params: { username: "nonExistUser" } };
    const res = { locals: { user: { ...user, role: "teacher" } } };
    const next = (err) => {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureCorrectUserOrAdmin(req, res, next);
  });
});
