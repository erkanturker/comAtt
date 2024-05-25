const request = require("supertest");
const app = require("./app");
const db = require("./db");

describe("App Test", () => {
  test("should first return 404", async () => {
    const res = await request(app).get("/testRoute");
    expect(res.statusCode).toBe(404);
  });
});

afterAll(() => {
  db.end();
});
