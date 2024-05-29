const request = require("supertest");
const app = require("../app"); // Ensure your Express app is exported from this file
const db = require("../db");
const {
  commonBeforeAll,
  commonAfterAll,
  adminToken,
  teacherToken,
} = require("./_testCommon");
const Subject = require("../models/subject");

beforeAll(commonBeforeAll);
afterAll(commonAfterAll);

describe("POST /subjects", () => {
  test("should create a new subject", async () => {
    const resp = await request(app)
      .post("/subjects")
      .send({
        subjectName: "Mathematics",
        teacherId: "u2",
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      subjectId: expect.any(Number),
      subjectName: "Mathematics",
      teacherId: "u2",
    });
  });

  test("should return 400 for invalid data", async () => {
    const resp = await request(app)
      .post("/subjects")
      .send({
        subjectName: "",
        teacherId: "teacher1",
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(400);
  });

  test("should return 404 if teacher does not exist", async () => {
    const resp = await request(app)
      .post("/subjects")
      .send({
        subjectName: "Mathematics",
        teacherId: "nonExistentTeacher",
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(404);
  });
});

describe("GET /subjects", () => {
  test("should get all subjects", async () => {
    const resp = await request(app)
      .get("/subjects")
      .set("authorization", `Bearer ${teacherToken}`);

    expect(resp.statusCode).toBe(200);
    expect(Array.isArray(resp.body.subjects)).toBe(true);
  });

  test("should return 401 if unauthorized", async () => {
    const resp = await request(app).get("/subjects");

    expect(resp.statusCode).toBe(401);
  });
});

describe("GET /subjects/:subjectId", () => {
  test("should get a single subject by ID", async () => {
    const subject = await Subject.create({
      subjectName: "Science",
      teacherId: "u2",
    });
    const resp = await request(app)
      .get(`/subjects/${subject.subjectId}`)
      .set("authorization", `Bearer ${teacherToken}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      subjectId: subject.subjectId,
      subjectName: "Science",
      teacherId: "u2",
    });
  });

  test("should return 404 for non-existing subject", async () => {
    const resp = await request(app)
      .get("/subjects/9999")
      .set("authorization", `Bearer ${teacherToken}`);

    expect(resp.statusCode).toBe(404);
  });

  test("should return 401 if unauthorized", async () => {
    const subject = await Subject.create({
      subjectName: "Science",
      teacherId: "u2",
    });
    const resp = await request(app).get(`/subjects/${subject.subjectId}`);

    expect(resp.statusCode).toBe(401);
  });
});

describe("PATCH /subjects/:subjectId", () => {
  test("should update a subject", async () => {
    const subject = await Subject.create({
      subjectName: "Science",
      teacherId: "u2",
    });
    const resp = await request(app)
      .patch(`/subjects/${subject.subjectId}`)
      .send({ subjectName: "Advanced Science" })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      subjectId: subject.subjectId,
      subjectName: "Advanced Science",
      teacherId: "u2",
    });
  });

  test("should return 400 for invalid data", async () => {
    const subject = await Subject.create({
      subjectName: "Science",
      teacherId: "u2",
    });
    const resp = await request(app)
      .patch(`/subjects/${subject.subjectId}`)
      .send({ subjectName: "" })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(400);
  });

  test("should return 404 if subject does not exist", async () => {
    const resp = await request(app)
      .patch("/subjects/9999")
      .send({ subjectName: "Advanced Science" })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(404);
  });

  test("should return 401 if unauthorized", async () => {
    const subject = await Subject.create({
      subjectName: "Science",
      teacherId: "u2",
    });
    const resp = await request(app)
      .patch(`/subjects/${subject.subjectId}`)
      .send({ subjectName: "Advanced Science" });

    expect(resp.statusCode).toBe(401);
  });
});

describe("DELETE /subjects/:subjectId", () => {
  test("should delete a subject by ID", async () => {
    const subject = await Subject.create({
      subjectName: "Science",
      teacherId: "u2",
    });
    const resp = await request(app)
      .delete(`/subjects/${subject.subjectId}`)
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ status: "deleted" });
  });

  test("should return 404 for non-existing subject", async () => {
    const resp = await request(app)
      .delete("/subjects/9999")
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(404);
  });

  test("should return 401 if unauthorized", async () => {
    const subject = await Subject.create({
      subjectName: "Science",
      teacherId: "u2",
    });
    const resp = await request(app).delete(`/subjects/${subject.subjectId}`);

    expect(resp.statusCode).toBe(401);
  });
});
