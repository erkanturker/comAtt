const request = require("supertest");
const app = require("../app"); // Ensure your Express app is exported from this file
const db = require("../db");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  adminToken,
  teacherToken,
} = require("./_testCommon");
const Term = require("../models/term");

beforeAll(commonBeforeAll);
afterAll(commonAfterAll);

describe("Term Routes", () => {
  let termId;

  test("POST /terms - should create a new term", async () => {
    const resp = await request(app)
      .post("/terms")
      .send({
        termName: "Spring 2024",
        startDate: "2024-01-01",
        endDate: "2024-05-31",
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      term: {
        termId: expect.any(Number),
        termName: "Spring 2024",
        startDate: expect.any(String),
        endDate: expect.any(String),
      },
    });
    termId = resp.body.term.termId;
  });

  test("POST /terms - should return 400 for invalid data", async () => {
    const resp = await request(app)
      .post("/terms")
      .send({
        termName: "",
        startDate: "invalid-date",
        endDate: "2024-05-31",
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(400);
  });

  test("GET /terms - should retrieve all terms", async () => {
    const resp = await request(app)
      .get("/terms")
      .set("authorization", `Bearer ${teacherToken}`);

    expect(resp.statusCode).toBe(200);
    expect(Array.isArray(resp.body.terms)).toBe(true);
  });

  test("GET /terms/:termId - should retrieve a single term by ID", async () => {
    const resp = await request(app)
      .get(`/terms/${termId}`)
      .set("authorization", `Bearer ${teacherToken}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      termId: termId,
      termName: "Spring 2024",
      startDate: expect.any(String),
      endDate: expect.any(String),
    });
  });

  test("GET /terms/:termId - should return 404 for non-existing term", async () => {
    const resp = await request(app)
      .get(`/terms/9999`)
      .set("authorization", `Bearer ${teacherToken}`);

    expect(resp.statusCode).toBe(404);
  });

  test("PATCH /terms/:termId - should update a term", async () => {
    const resp = await request(app)
      .patch(`/terms/${termId}`)
      .send({ termName: "Updated Spring 2024" })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      term: {
        termId: termId,
        termName: "Updated Spring 2024",
        startDate: expect.any(String),
        endDate: expect.any(String),
      },
    });
  });

  test("PATCH /terms/:termId - should return 400 for invalid data", async () => {
    const resp = await request(app)
      .patch(`/terms/${termId}`)
      .send({ startDate: "invalid-date" })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(400);
  });

  test("DELETE /terms/:termId - should delete a term", async () => {
    const resp = await request(app)
      .delete(`/terms/${termId}`)
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ status: "deleted" });
  });

  test("DELETE /terms/:termId - should return 404 for non-existing term", async () => {
    const resp = await request(app)
      .delete(`/terms/9999`)
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(404);
  });
});
