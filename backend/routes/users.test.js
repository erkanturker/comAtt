const request = require("supertest");
const app = require("../app");
const {
  commonBeforeAll,
  commonAfterAll,
  adminToken,
  teacherToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
afterAll(commonAfterAll);

describe("Get All Users", () => {
  test("should first", async () => {
    const resp = await request(app)
      .get("/users")
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      users: [
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
      ],
    });
  });

  test("should first 401 without admin token", async () => {
    const resp = await request(app).get("/users");
    expect(resp.statusCode).toBe(401);
  });
});

describe("GET /users/:username", () => {
  test("should get user", async () => {
    const resp = await request(app)
      .get("/users/u2")
      .set("authorization", `Bearer ${teacherToken}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      user: {
        username: "u2",
        firstName: "U2F",
        lastName: "U2L",
        email: "u2@email.com",
        role: "teacher",
      },
    });
  });

  test("should get 404 if admin ", async () => {
    const resp = await request(app)
      .get("/users/nonUser")
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toBe(404);
  });
});
