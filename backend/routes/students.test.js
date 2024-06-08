const request = require("supertest");
const app = require("../app");
const db = require("../db");
const {
  commonBeforeAll,
  commonAfterAll,
  commonBeforeEach,
  commonAfterEach,
  groupIds,
  adminToken,
  teacherToken,
} = require("./_testCommon");
const Student = require("../models/student");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("POST /students", () => {
  test("should create new student", async () => {
    const resp = await request(app)
      .post("/students")
      .send({
        groupId: groupIds[0],
        firstName: "John",
        lastName: "Doe",
        age: 10,
        parentFirstName: "Jane",
        parentLastName: "Doe",
        parentPhone: "123-456-7890",
        parentEmail: "jane.doe@example.com",
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toHaveProperty("studentId");
  });

  test("should return 400 for invalid data", async () => {
    const resp = await request(app)
      .post("/students")
      .send({
        groupId: "invalid", // Invalid groupId
        firstName: "John",
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(400);
  });
});

describe("GET /students", () => {
  test("should get all students", async () => {
    const resp = await request(app)
      .get("/students")
      .set("authorization", `Bearer ${teacherToken}`);

    expect(resp.statusCode).toBe(200);
    expect(Array.isArray(resp.body)).toBe(true);
  });
});

describe("GET /students/:studentId", () => {
  test("should get a single student by ID", async () => {
    const newStudent = await Student.create({
      groupId: groupIds[0],
      firstName: "John",
      lastName: "Doe",
      age: 10,
      parentFirstName: "Jane",
      parentLastName: "Doe",
      parentPhone: "123-456-7890",
      parentEmail: "jane.doe@example.com",
    });

    const resp = await request(app)
      .get(`/students/${newStudent.studentId}`)
      .set("authorization", `Bearer ${teacherToken}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toHaveProperty("studentId");
  });

  test("should return 404 for non-existing student", async () => {
    const resp = await request(app)
      .get(`/students/9999`)
      .set("authorization", `Bearer ${teacherToken}`);

    expect(resp.statusCode).toBe(404);
  });
});

describe("PATCH /students/:studentId", () => {
  test("should update a student", async () => {
    const newStudent = await Student.create({
      groupId: groupIds[0],
      firstName: "John",
      lastName: "Doe",
      age: 10,
      parentFirstName: "Jane",
      parentLastName: "Doe",
      parentPhone: "123-456-7890",
      parentEmail: "jane.doe@example.com",
    });

    const resp = await request(app)
      .patch(`/students/${newStudent.studentId}`)
      .send({ firstName: "Johnny" })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.firstName).toBe("Johnny");
  });

  test("should return 400 for invalid data", async () => {
    const newStudent = await Student.create({
      groupId: groupIds[0],
      firstName: "John",
      lastName: "Doe",
      age: 10,
      parentFirstName: "Jane",
      parentLastName: "Doe",
      parentPhone: "123-456-7890",
      parentEmail: "jane.doe@example.com",
    });

    const resp = await request(app)
      .patch(`/students/${newStudent.studentId}`)
      .send({ groupId: "invalid" })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(400);
  });
});

describe("DELETE /students/:studentId", () => {
  test("should delete a student", async () => {
    const newStudent = await Student.create({
      groupId: groupIds[0],
      firstName: "John",
      lastName: "Doe",
      age: 10,
      parentFirstName: "Jane",
      parentLastName: "Doe",
      parentPhone: "123-456-7890",
      parentEmail: "jane.doe@example.com",
    });

    const resp = await request(app)
      .delete(`/students/${newStudent.studentId}`)
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ status: "deleted" });
  });

  test("should return 404 for non-existing student", async () => {
    const resp = await request(app)
      .delete(`/students/9999`)
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(404);
  });
});
