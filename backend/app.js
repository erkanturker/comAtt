"use strict";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path"); // Add this line

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const groupsRoutes = require("./routes/groups");
const studentsRoutes = require("./routes/students");
const termsRoutes = require("./routes/terms");
const subjectsRoutes = require("./routes/subjects");
const periodsRoutes = require("./routes/periods");
const attendancesRoutes = require("./routes/attendances");

const { NotFoundError } = require("./expressError");
const { authJWT } = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJWT);

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/groups", groupsRoutes);
app.use("/students", studentsRoutes);
app.use("/terms", termsRoutes);
app.use("/subjects", subjectsRoutes);
app.use("/periods", periodsRoutes);
app.use("/attendances", attendancesRoutes);

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

// Serve index.html for all routes
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;
