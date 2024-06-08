const Period = require("./period");
const {
  commonBeforeAll,
  commonAfterAll,
  groupIds,
  subjectIds,
  termData,
} = require("./_testCommon");
const { NotFoundError } = require("../expressError");

beforeAll(commonBeforeAll);
afterAll(commonAfterAll);

describe("Period model", function () {
  let periodData;
  let periodId;

  beforeAll(async () => {
    periodData = {
      periodNumber: 2,
      subjectId: subjectIds[0],
      groupId: groupIds[0],
      termId: termData.termId,
      date: "2024-01-07",
    };
  });

  test("create a new period", async function () {
    const period = await Period.create(periodData);
    expect(period).toEqual({
      periodId: expect.any(Number),
      periodNumber: 2,
      subjectId: subjectIds[0],
      groupId: groupIds[0],
      termId: termData.termId,
      date: expect.any(Date),
    });
    periodId = period.periodId;
  });

  test("get all periods", async function () {
    const periods = await Period.getAll();
    expect(periods.length > 0).toBeTruthy();
  });

  test("get a period by ID", async function () {
    const period = await Period.getById(periodId);
    expect(period).toEqual({
      periodId: periodId,
      attendanceTaken: false,
      periodNumber: 2,
      subjectId: subjectIds[0],
      groupId: groupIds[0],
      termId: termData.termId,
      date: expect.any(Date),
    });
  });

  test("update a period", async function () {
    const updatedData = {
      periodNumber: 3,
      date: "2024-01-14",
    };
    const updatedPeriod = await Period.update(periodId, updatedData);
    expect(updatedPeriod).toEqual({
      periodId: periodId,
      attendanceTaken: false,
      periodNumber: 3,
      subjectId: subjectIds[0],
      groupId: groupIds[0],
      termId: termData.termId,
      date: expect.any(Date),
    });
  });

  test("remove a period", async function () {
    await Period.remove(periodId);
    try {
      await Period.getById(periodId);
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
