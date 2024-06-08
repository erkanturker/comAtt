const request = require("supertest");
const app = require("../app");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  adminToken,
  teacherToken,
  studentIds,
  periodIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("POST /attendances", () => {
  test("should create a new attendance record", async () => {
    const resp = await request(app)
      .post("/attendances")
      .send({
        studentId: studentIds[0],
        periodId: periodIds[0],
        date: "2024-01-07",
        status: true,
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      attendanceId: expect.any(Number),
      studentId: studentIds[0],
      periodId: periodIds[0],
      date: expect.any(String), // Expect any string for the date
      status: true,
    });
  });

  test("should return 400 if validation fails", async () => {
    const resp = await request(app)
      .post("/attendances")
      .send({
        studentId: studentIds[0],
        periodId: periodIds[0],
      }) // Missing required fields
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(400);
  });
});

describe("GET /attendances", () => {
  test("should get all attendance records", async () => {
    const resp = await request(app)
      .get("/attendances")
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(200);
    expect(Array.isArray(resp.body)).toBeTruthy();
  });

  test("should return 401 if not authenticated", async () => {
    const resp = await request(app).get("/attendances");
    expect(resp.statusCode).toBe(401);
  });
});

describe("GET /attendances/:attendanceId", () => {
  test("should get attendance record by ID", async () => {
    const newAttendance = await request(app)
      .post("/attendances")
      .send({
        studentId: studentIds[0],
        periodId: periodIds[0],
        date: "2024-01-07",
        status: true,
      })
      .set("authorization", `Bearer ${adminToken}`);

    const resp = await request(app)
      .get(`/attendances/${newAttendance.body.attendanceId}`)
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      attendanceId: newAttendance.body.attendanceId,
      studentId: studentIds[0],
      periodId: periodIds[0],
      date: expect.any(String), // Expect any string for the date
      status: true,
    });
  });

  test("should return 404 if attendance not found", async () => {
    const resp = await request(app)
      .get("/attendances/9999")
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(404);
  });

  test("should return 401 if not authenticated", async () => {
    const resp = await request(app).get("/attendances/1");
    expect(resp.statusCode).toBe(401);
  });
});

describe("PATCH /attendances/:attendanceId", () => {
  test("should update attendance record", async () => {
    const newAttendance = await request(app)
      .post("/attendances")
      .send({
        studentId: studentIds[0],
        periodId: periodIds[0],
        date: "2024-01-07",
        status: true,
      })
      .set("authorization", `Bearer ${adminToken}`);

    const resp = await request(app)
      .patch(`/attendances/${newAttendance.body.attendanceId}`)
      .send({
        status: false,
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      attendanceId: newAttendance.body.attendanceId,
      studentId: studentIds[0],
      periodId: periodIds[0],
      date: expect.any(String), // Expect any string for the date
      status: false,
    });
  });

  test("should return 400 if validation fails", async () => {
    const newAttendance = await request(app)
      .post("/attendances")
      .send({
        studentId: studentIds[0],
        periodId: periodIds[0],
        date: "2024-01-07",
        status: true,
      })
      .set("authorization", `Bearer ${adminToken}`);

    const resp = await request(app)
      .patch(`/attendances/${newAttendance.body.attendanceId}`)
      .send({
        date: "invalid-date",
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(400);
  });

  test("should return 404 if attendance not found", async () => {
    const resp = await request(app)
      .patch("/attendances/9999")
      .send({
        status: false,
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(404);
  });
});

describe("DELETE /attendances/:attendanceId", () => {
  test("should delete attendance record", async () => {
    const newAttendance = await request(app)
      .post("/attendances")
      .send({
        studentId: studentIds[0],
        periodId: periodIds[0],
        date: "2024-01-07",
        status: true,
      })
      .set("authorization", `Bearer ${adminToken}`);

    const resp = await request(app)
      .delete(`/attendances/${newAttendance.body.attendanceId}`)
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ status: "deleted" });
  });

  test("should return 404 if attendance not found", async () => {
    const resp = await request(app)
      .delete("/attendances/9999")
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toBe(404);
  });
});
