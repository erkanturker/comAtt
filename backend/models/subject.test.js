const db = require("../db");
const Subject = require("./subject");
const { NotFoundError, BadRequestError } = require("../expressError");
const { commonBeforeAll, commonAfterAll } = require("./_testCommon");

beforeAll(commonBeforeAll);

afterAll(commonAfterAll);

describe("Subject Model", () => {
  let subjectId;

  test("create new subject", async () => {
    const subjectData = {
      subjectName: "Mathematics",
      teacherId: "u2",
    };

    const subject = await Subject.create(subjectData);
    subjectId = subject.subjectId;

    expect(subject).toEqual({
      subjectId: expect.any(Number),
      subjectName: "Mathematics",
      teacherId: "u2",
    });
  });

  test("get subject by id", async () => {
    const subject = await Subject.get(subjectId);

    expect(subject).toEqual({
      subjectId: subjectId,
      subjectName: "Mathematics",
      teacherId: "u2",
    });
  });

  test("get all subjects", async () => {
    const subjects = await Subject.getAll();

    expect(Array.isArray(subjects)).toBe(true);
    expect(subjects.length).toBeGreaterThan(0);
  });

  test("update subject", async () => {
    const updatedData = { subjectName: "Advanced Mathematics" };
    const subject = await Subject.update(subjectId, updatedData);

    expect(subject).toEqual({
      subjectId: subjectId,
      subjectName: "Advanced Mathematics",
      teacherId: "u2",
    });
  });

  test("remove subject by id", async () => {
    await Subject.remove(subjectId);

    try {
      await Subject.get(subjectId);
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
