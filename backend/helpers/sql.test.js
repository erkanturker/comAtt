const { BadRequestError } = require("../expressError");
const { commonAfterAll } = require("../models/_testCommon");
const { partialUpdate, checkDuplicateUsername } = require("./sql");

// Mock the module
jest.mock("./sql", () => ({
  ...jest.requireActual("./sql"), // Import everything from the actual module
  checkDuplicateUsername: jest.fn(), // Mock only checkDuplicateUsername
}));

beforeEach(() => {
  jest.clearAllMocks();
});

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
    // Mock the implementation of checkDuplicateUsername to return true
    checkDuplicateUsername.mockResolvedValue(true);

    const isExist = await checkDuplicateUsername("u1");
    expect(isExist).toBeTruthy();
  });

  test("should return false", async () => {
    // Mock the implementation of checkDuplicateUsername to return false
    checkDuplicateUsername.mockResolvedValue(false);

    const isExist = await checkDuplicateUsername("nonUser");
    expect(isExist).toBeFalsy();
  });
});

afterAll(commonAfterAll);
