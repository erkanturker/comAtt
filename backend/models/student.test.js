const db = require("../db");
const Student = require("./student");
const { NotFoundError, BadRequestError } = require("../expressError");
const {
  commonBeforeAll,
  commonAfterAll,
  commonBeforeEach,
  commonAfterEach,
  groupIds,
} = require("./_testCommon");

// Mock data to be used in tests
let studentData;

beforeAll(async () => {
  // Setup initial data in the database if necessary
  await db.query("DELETE FROM students");
  await commonBeforeAll();
  studentData = {
    groupId: groupIds[0],
    firstName: "John",
    lastName: "Doe",
    age: 10,
    parentFirstName: "Jane",
    parentLastName: "Doe",
    parentPhone: "123-456-7890",
    parentEmail: "jane.doe@example.com",
  };
});



afterAll(async () => {
  // Cleanup database after tests
  await db.query("DELETE FROM students");
  commonAfterAll();
});

describe("Student Model", () => {
  let studentId;

  test("create new student", async () => {
    const student = await Student.create(studentData);
    studentId = student.studentId;

    expect(student).toEqual({
      studentId: expect.any(Number),
      groupId: studentData.groupId,
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      age: studentData.age,
      parentFirstName: studentData.parentFirstName,
      parentLastName: studentData.parentLastName,
      parentPhone: studentData.parentPhone,
      parentEmail: studentData.parentEmail,
    });
  });

  test("get student by id", async () => {
    const student = await Student.get(studentId);

    expect(student).toEqual({
      studentId: studentId,
      groupId: studentData.groupId,
      firstName: studentData.firstName,
      lastName: studentData.lastName,
      age: studentData.age,
      parentFirstName: studentData.parentFirstName,
      parentLastName: studentData.parentLastName,
      parentPhone: studentData.parentPhone,
      parentEmail: studentData.parentEmail,
    });
  });

  test("update student", async () => {
    const updatedData = { firstName: "UpdatedFirstName" };
    const student = await Student.update(studentId, updatedData);

    expect(student).toEqual({
      studentId: studentId,
      groupId: studentData.groupId,
      firstName: "UpdatedFirstName",
      lastName: studentData.lastName,
      age: studentData.age,
      parentFirstName: studentData.parentFirstName,
      parentLastName: studentData.parentLastName,
      parentPhone: studentData.parentPhone,
      parentEmail: studentData.parentEmail,
    });
  });

  test("get all students", async () => {
    const students = await Student.getAll();

    expect(Array.isArray(students)).toBe(true);
    expect(students.length).toBeGreaterThan(0);
  });

  test("remove student by id", async () => {
    await Student.remove(studentId);

    try {
      await Student.get(studentId);
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
