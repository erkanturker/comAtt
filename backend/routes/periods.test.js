const request = require("supertest");
const db = require("../db");
const app = require("../app");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  groupIds,
  subjectIds,
  termData,
  adminToken,
  teacherToken,
} = require("./_testCommon");
const Period = require("../models/period");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("POST /periods", () => {
  test("should create a new period", async () => {
    const resp = await request(app)
      .post("/periods")
      .send({
        periodNumber: 1,
        subjectId: subjectIds[0],
        groupId: groupIds[0],
        termId: termData.termId,
        date: "2024-01-07",
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      periodId: expect.any(Number),
      periodNumber: 1,
      subjectId: subjectIds[0],
      groupId: groupIds[0],
      termId: termData.termId,
      date: expect.any(String),
    });
  });

  test("should return 400 for missing fields", async () => {
    const resp = await request(app)
      .post("/periods")
      .send({
        periodNumber: 1,
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(400);
  });
});

describe("GET /periods", () => {
  test("should get all periods", async () => {
    const resp = await request(app)
      .get("/periods")
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(200);
    expect(Array.isArray(resp.body.periods)).toBe(true);
  });

  test("should return 401 for unauthorized users", async () => {
    const resp = await request(app).get("/periods");
    expect(resp.statusCode).toBe(401);
  });
});

describe("GET /periods/:periodId", () => {
  test("should get a period by ID", async () => {
    const period = await Period.create({
      periodNumber: 4,
      subjectId: subjectIds[0],
      groupId: groupIds[0],
      termId: termData.termId,
      date: "2024-01-07",
    });

    const resp = await request(app)
      .get(`/periods/${period.periodId}`)
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      periodId: expect.any(Number),
      periodNumber: 4,
      subjectId: subjectIds[0],
      groupId: groupIds[0],
      termId: termData.termId,
      date: expect.any(String),
    });
  });

  test("should return 404 for non-existent period", async () => {
    const resp = await request(app)
      .get("/periods/9999")
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(404);
  });
});

describe("PATCH /periods/:periodId", () => {
  test("should update a period", async () => {
    const period = await Period.create({
      periodNumber: 2,
      subjectId: subjectIds[0],
      groupId: groupIds[0],
      termId: termData.termId,
      date: "2024-01-07",
    });

    const resp = await request(app)
      .patch(`/periods/${period.periodId}`)
      .send({
        periodNumber: 2,
        subjectId: subjectIds[1],
        groupId: groupIds[1],
        termId: termData.termId,
        date: "2024-01-14",
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      periodId: period.periodId,
      periodNumber: 2,
      subjectId: subjectIds[1],
      groupId: groupIds[1],
      termId: termData.termId,
      date: expect.any(String),
    });
  });

  test("should return 404 for non-existent period", async () => {
    const resp = await request(app)
      .patch("/periods/9999")
      .send({
        periodNumber: 2,
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(404);
  });

  test("should return 400 for invalid data", async () => {
    const period = await Period.create({
      periodNumber: 1,
      subjectId: subjectIds[0],
      groupId: groupIds[0],
      termId: termData.termId,
      date: "2024-01-07",
    });

    const resp = await request(app)
      .patch(`/periods/${period.periodId}`)
      .send({
        periodNumber: "invalid",
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(400);
  });
});

describe("DELETE /periods/:periodId", () => {
  test("should delete a period", async () => {
    const period = await Period.create({
      periodNumber: 12,
      subjectId: subjectIds[0],
      groupId: groupIds[0],
      termId: termData.termId,
      date: "2024-01-07",
    });

    const resp = await request(app)
      .delete(`/periods/${period.periodId}`)
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ status: "deleted" });

    const getResp = await request(app)
      .get(`/periods/${period.periodId}`)
      .set("authorization", `Bearer ${adminToken}`);

    expect(getResp.statusCode).toBe(404);
  });

  test("should return 404 for non-existent period", async () => {
    const resp = await request(app)
      .delete("/periods/9999")
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(404);
  });
});
