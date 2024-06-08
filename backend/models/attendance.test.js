const db = require("../db");
const Attendance = require("./attendance");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  studentIds,
  periodIds,
} = require("./_testCommon");
const { NotFoundError } = require("../expressError");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("create", () => {
  test("should create a new attendance record", async () => {
    const newAttendance = await Attendance.create({
      studentId: studentIds[0],
      periodId: periodIds[0],
      date: "2024-01-07",
      status: true,
    });

    expect(newAttendance).toEqual({
      attendanceId: expect.any(Number),
      studentId: studentIds[0],
      periodId: periodIds[0],
      date: expect.any(Date),
      status: true,
    });

    const result = await db.query(
      "SELECT * FROM attendances WHERE attendance_id = $1",
      [newAttendance.attendanceId]
    );
    expect(result.rows.length).toEqual(1);
  });
});

describe("getById", () => {
  test("should retrieve attendance by ID", async () => {
    const newAttendance = await Attendance.create({
      studentId: studentIds[0],
      periodId: periodIds[0],
      date: "2024-01-07",
      status: true,
    });

    const attendance = await Attendance.getById(newAttendance.attendanceId);

    expect(attendance).toEqual(newAttendance);
  });

  test("should throw NotFoundError if no attendance found", async () => {
    try {
      await Attendance.getById(9999);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe("update", () => {
  test("should update attendance record", async () => {
    const newAttendance = await Attendance.create({
      studentId: studentIds[0],
      periodId: periodIds[0],
      date: "2024-01-07",
      status: true,
    });

    const updatedAttendance = await Attendance.update(
      newAttendance.attendanceId,
      {
        status: false,
      }
    );

    expect(updatedAttendance.status).toBe(false);
    expect(updatedAttendance.attendanceId).toBe(newAttendance.attendanceId);
  });

  test("should throw NotFoundError if no attendance found", async () => {
    try {
      await Attendance.update(9999, { status: false });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe("remove", () => {
  test("should delete attendance record", async () => {
    const newAttendance = await Attendance.create({
      studentId: studentIds[0],
      periodId: periodIds[0],
      date: "2024-01-07",
      status: true,
    });

    await Attendance.remove(newAttendance.attendanceId);

    const result = await db.query(
      "SELECT * FROM attendances WHERE attendance_id = $1",
      [newAttendance.attendanceId]
    );
    expect(result.rows.length).toEqual(0);
  });

  test("should throw NotFoundError if no attendance found", async () => {
    try {
      await Attendance.remove(9999);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe("getAll", () => {
  test("should retrieve all attendance records", async () => {
    const newAttendance1 = await Attendance.create({
      studentId: studentIds[0],
      periodId: periodIds[0],
      date: "2024-01-07",
      status: true,
    });

    const newAttendance2 = await Attendance.create({
      studentId: studentIds[1],
      periodId: periodIds[1],
      date: "2024-01-14",
      status: false,
    });

    const attendances = await Attendance.getAll();

    expect(attendances).toEqual(
      expect.arrayContaining([newAttendance1, newAttendance2])
    );
  });
});

describe("periodAttendance", () => {
  test("should create multiple attendance records for a period", async () => {
    const attendances = [
      { studentId: studentIds[0], status: true },
      { studentId: studentIds[1], status: false },
    ];
    const date = "2024-01-07";

    await Attendance.periodAttendance(periodIds[0], attendances, date);

    const result = await db.query(
      "SELECT * FROM attendances WHERE period_id = $1",
      [periodIds[0]]
    );
    expect(result.rows.length).toEqual(attendances.length);
    expect(result.rows).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          student_id: studentIds[0],
          status: true,
        }),
        expect.objectContaining({
          student_id: studentIds[1],
          status: false,
        }),
      ])
    );
  });
});

describe("switchStatusOfAttendance", () => {
  test("should update the status of attendance records for a period", async () => {
    const attendances = [
      { studentId: studentIds[0], status: false },
      { studentId: studentIds[1], status: true },
    ];
    const date = "2024-01-07";

    await Attendance.periodAttendance(periodIds[0], attendances, date);

    const updatedAttendances = [
      { studentId: studentIds[0], status: true },
      { studentId: studentIds[1], status: false },
    ];

    await Attendance.switchStatusOfAttendance(
      periodIds[0],
      updatedAttendances,
      date
    );

    const result = await db.query(
      "SELECT * FROM attendances WHERE period_id = $1",
      [periodIds[0]]
    );

    expect(result.rows).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          student_id: studentIds[0],
          status: true,
        }),
        expect.objectContaining({
          student_id: studentIds[1],
          status: false,
        }),
      ])
    );
  });
});

describe("getAttendanceByPeriod", () => {
  test("should retrieve attendance records for a specific period", async () => {
    const newAttendance1 = await Attendance.create({
      studentId: studentIds[0],
      periodId: periodIds[0],
      date: "2024-01-07",
      status: true,
    });

    const newAttendance2 = await Attendance.create({
      studentId: studentIds[1],
      periodId: periodIds[0],
      date: "2024-01-07",
      status: false,
    });

    const attendances = await Attendance.getAttendanceByPeriod(periodIds[0]);

    expect(attendances).toEqual(
      expect.arrayContaining([newAttendance1, newAttendance2])
    );
  });
});
