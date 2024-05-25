const request = require("supertest");
const app = require("../app");
const { commonBeforeAll, commonAfterAll } = require("./_testCommon");

beforeAll(commonBeforeAll);
afterAll(commonAfterAll);

describe("POST /auth/token", () => {
  test("should get token on response", async () => {
    const resp = await request(app).post("/auth/token").send({
      username: "u1",
      password: "password1",
    });

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      token: expect.any(String),
    });
  });

  test("should return 401 error", async () => {
    const resp = await request(app).post("/auth/token").send({
      username: "u1",
      password: "xxxx",
    });
    expect(resp.statusCode).toBe(401);
  });

  test("should return 400 bad request when missing payload", async () => {
    const resp = await request(app).post("/auth/token").send();
    expect(resp.statusCode).toBe(400);
  });
});

describe("POST /auth/register", () => {
  test("should register new user", async () => {
    const resp = await request(app).post("/auth/register").send({
      username: "testUser",
      password: "123456",
      firstName: "Test",
      lastName: "User",
      email: "testuser@gmail.com",
      role: "teacher",
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body.username).toBe("testUser");
  });

  test("should return 400 when it is duplicate", async () => {
    const resp = await request(app).post("/auth/register").send({
      username: "u1",
      password: "1234",
      firstName: "Test",
      lastName: "User",
      email: "testuser@gmail.com",
      role: "admin",
    });
    expect(resp.statusCode).toBe(400);
  });

  test("should return 400 bad request missing field", async () => {
    const resp = await request(app).post("/auth/register").send();
    expect(resp.statusCode).toBe(400);
  });
});
