const request = require("supertest");
const app = require("../app");
const {
  commonBeforeAll,
  commonAfterAll,
  commonBeforeEach,
  commonAfterEach,
  adminToken,
  teacherToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("POST /create new User", () => {
  test("should register new user", async () => {
    const resp = await request(app)
      .post("/users")
      .send({
        username: "testNewUser",
        password: "123456",
        firstName: "Test",
        lastName: "User",
        email: "testuserNewUser@gmail.com",
        role: "teacher",
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(201);
    expect(resp.body.username).toBe("testNewUser");
  });

  test("should return 400 when it is duplicate", async () => {
    const resp = await request(app)
      .post("/users")
      .send({
        username: "u1",
        password: "1234",
        firstName: "Test",
        lastName: "User",
        email: "testuser@gmail.com",
        role: "admin",
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(400);
  });

  test("should return 400 bad request missing field", async () => {
    const resp = await request(app)
      .post("/users")
      .send()
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toBe(400);
  });
});

describe("Get All Users", () => {
  test("should first", async () => {
    const resp = await request(app)
      .get("/users")
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toBeTruthy();
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
      username: "u2",
      firstName: "U2F",
      lastName: "U2L",
      email: "u2@email.com",
      role: "teacher",
    });
  });

  test("should get 404 if admin ", async () => {
    const resp = await request(app)
      .get("/users/nonUser")
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toBe(404);
  });
});

describe("Delete User", () => {
  test("should delete user", async () => {
    const resp = await request(app)
      .delete("/users/u2")
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ status: "deleted" });
  });

  test("should return 404 if not user found", async () => {
    const resp = await request(app)
      .delete("/users/testNewUser")
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toBe(404);
  });

  test("should return 401 if no admin token", async () => {
    const resp = await request(app).delete("/users/testNewUser");
    expect(resp.statusCode).toBe(401);
  });
});

describe("update User", () => {
  test("should update user", async () => {
    const resp = await request(app)
      .patch("/users/u2")
      .send({ lastName: "U2L" })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toBe(200);
  });

  test("should return 400 badrequest", async () => {
    const resp = await request(app)
      .patch("/users/testNewUser")
      .send({ lastName: "" })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toBe(400);
  });

  test("should return 404 not found", async () => {
    const resp = await request(app)
      .patch("/users/testNewUser")
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toBe(404);
  });
});
