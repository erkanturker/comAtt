const { BadRequestError } = require("../expressError");
const partialUpdate = require("./sql");

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
