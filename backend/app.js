const express = require("express");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const { NotFoundError } = require("./expressError");
const { authJWT } = require("./middleware/auth");

const app = express();
app.use(express.json());

app.use(authJWT);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

/** Handle 404 errors -- this matches everything */
app.use((req, res, next) => {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") console.log(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
