const request = require("supertest");
const app = require("../app");
const {
  commonBeforeAll,
  commonAfterAll,
  commonBeforeEach,
  commonAfterEach,
  adminToken,
  teacherToken,
  groupIds,
} = require("./_testCommon");

let newGroupId;

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("POST /groups", () => {
  test("should create new groups", async () => {
    const resp = await request(app)
      .post("/groups")
      .send({
        groupName: "Test Group",
      })
      .set("authorization", `Bearer ${adminToken}`);

    newGroupId = resp.body.groupId;

    expect(resp.statusCode).toBe(201);
    expect(resp.body.groupName).toBe("Test Group");
  });

  test("should return 400 when the group name already exist", async () => {
    const resp = await request(app)
      .post("/groups")
      .send({
        groupName: "K-2 Boys",
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(400);
  });

  test("should return 401 unauhtorized", async () => {
    const resp = await request(app).post("/groups").send({
      groupName: "Test Group",
    });
    expect(resp.statusCode).toBe(401);
  });
});

describe("GET /groups ", () => {
  test("should get all groups", async () => {
    const resp = await request(app)
      .get("/groups")
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toBe(200);
    expect(Array.isArray(resp.body.groups)).toBeTruthy();
  });

  test("should return 401 unauhtorized", async () => {
    const resp = await request(app).get("/groups");
    expect(resp.statusCode).toBe(401);
  });
});

describe("GET /groups/:id ", () => {
  test("should get group by id", async () => {
    const resp = await request(app)
      .get(`/groups/${groupIds[0]}`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.groupName).toBe("K-2 Boys");
  });

  test("should receive 404 Not found Error", async () => {
    const resp = await request(app)
      .get(`/groups/${groupIds[0] + 10}`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toBe(404);
  });

  test("should receive 401 Unuathorized", async () => {
    const resp = await request(app)
      .get(`/groups/${groupIds[0]}`)
      .set("authorization", `Bearer ${teacherToken}`);
    expect(resp.statusCode).toBe(401);
  });
});

describe("PATCH /groups/:id", () => {
  test("update update group", async () => {
    const resp = await request(app)
      .patch(`/groups/${groupIds[2]}`)
      .send({ groupName: "Updated Group" })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.groupName).toBe("Updated Group");
  });

  test("should get 400 bad request when we already have group", async () => {
    const resp = await request(app)
      .patch(`/groups/${groupIds[2]}`)
      .send({ groupName: "K-2 Boys" })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(400);
  });

  test("should get 404 Not found", async () => {
    const resp = await request(app)
      .patch(`/groups/${groupIds[2] + 10}`)
      .send({ groupName: "K-2 Boys" })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(404);
  });

  test("should get 401 Unauthrozied", async () => {
    const resp = await request(app)
      .patch(`/groups/${newGroupId}`)
      .send({ groupName: "K-2 Boys" });

    expect(resp.statusCode).toBe(401);
  });
});

describe("DELETE /groups/:id ", () => {
  test("should delete user by id", async () => {
    const resp = await request(app)
      .delete(`/groups/${groupIds[2]}`)
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(200);
  });

  test("should return 404 Not Found", async () => {
    const resp = await request(app)
      .delete(`/groups/${groupIds[2] + 100}`)
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(404);
  });

  test("should return 401 UnAuthorzed", async () => {
    const resp = await request(app)
      .delete(`/groups/${groupIds[2]}`)
      .send({ groupName: "K-2 Boys" });

    expect(resp.statusCode).toBe(401);
  });
});
