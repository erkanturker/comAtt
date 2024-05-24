describe("config load from env", () => {
  let config;
  
  beforeAll(() => {
    process.env.PORT = "5000";
    process.env.SECRET_KEY = "secretTest";
    config = require("./config");
  });

  test("PORT can read from config file", () => {
    expect(config.PORT).toEqual("5000");
  });

  test("SECRET can read from config file", () => {
    expect(config.SECRET_KEY).toEqual("secretTest");
  });

  afterAll(() => {
    delete process.env.PORT;
    delete process.env.SECRET_KEY;
  });
});
