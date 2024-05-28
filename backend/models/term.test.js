const db = require("../db");
const Term = require("./term");
const { NotFoundError, BadRequestError } = require("../expressError");

beforeAll(async () => {
  // Setup initial data in the database if necessary
  await db.query("DELETE FROM terms");
});

afterAll(async () => {
  await db.query("DELETE FROM terms");
  await db.end();
});

describe("Term Model", () => {
  let termId;

  test("create new term", async () => {
    const termData = {
      termName: "Spring 2024",
      startDate: "2024-01-01",
      endDate: "2024-05-31",
    };

    const term = await Term.create(termData);
    termId = term.termId;

    expect(term).toEqual({
      termId: expect.any(Number),
      termName: "Spring 2024",
      startDate: expect.any(Date), // Adjust for time zone differences
      endDate: expect.any(Date), // Adjust for time zone differences
    });
  });

  test("get term by id", async () => {
    const term = await Term.get(termId);

    expect(term).toEqual({
      termId: termId,
      termName: "Spring 2024",
      startDate: expect.any(Date), // Adjust for time zone differences
      endDate: expect.any(Date), // Adjust for time zone differences
    });
  });

  test("get all terms", async () => {
    const terms = await Term.getAll();

    expect(Array.isArray(terms)).toBe(true);
    expect(terms.length).toBeGreaterThan(0);
  });

  test("update term", async () => {
    const updatedData = { termName: "Updated Spring 2024" };
    const term = await Term.update(termId, updatedData);

    expect(term).toEqual({
      termId: termId,
      termName: "Updated Spring 2024",
      startDate: expect.any(Date), // Adjust for time zone differences
      endDate: expect.any(Date), // Adjust for time zone differences
    });
  });

  test("remove term by id", async () => {
    await Term.remove(termId);

    try {
      await Term.get(termId);
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
