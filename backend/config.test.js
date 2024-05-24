describe("config load from env", () => {
  let config;

  beforeAll(() => {
    process.env.PORT = "5000";
    process.env.SECRET_KEY = "secretTest";
    process.env.DATABASE_URL = "test_db_url";
    process.env.NODE_ENV = "other";
    config = require("./config");
  });

  test("PORT can read from config file", () => {
    expect(config.PORT).toEqual("5000");
  });

  test("SECRET can read from config file", () => {
    expect(config.SECRET_KEY).toEqual("secretTest");
  });

  test("DATABASE_URL can read from config file", () => {
    expect(config.getDatabaseUri()).toEqual("test_db_url");
  });

  afterAll(() => {
    delete process.env.PORT;
    delete process.env.SECRET_KEY;
    delete process.env.DATABASE_URL;
    delete process.env.NODE_ENV;
  });
});
