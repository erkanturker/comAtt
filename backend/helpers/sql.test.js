const { BadRequestError } = require("../expressError");
const { commonAfterAll } = require("../models/_testCommon");
const { partialUpdate, checkDuplicateUsername } = require("./sql");

describe("partial update", () => {
  test("should partial update", () => {
    const data = { firstName: "John", age: 30 };
    const jsToSql = { firstName: "first_name" };

    const updateData = partialUpdate(data, jsToSql);

    expect(updateData).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ["John", 30],
    });
  });

  test("should return bad request error if no data provied", () => {
    try {
      partialUpdate({}, {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

describe("check duplicate", () => {
  test("should return true", async () => {
    const isExist = await checkDuplicateUsername("u1");
    expect(isExist).toBeTruthy();
  });

  test("should return false", async () => {
    const isExist = await checkDuplicateUsername("nonUser");
    expect(isExist).toBeFalsy();
  });
});

afterAll(commonAfterAll);
