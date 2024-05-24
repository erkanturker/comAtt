const express = require("express");
const registrationSchema = require("../validators/registartionValidator");
const { BadRequestError } = require("../expressError");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { error } = registrationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((details) => details.message);
      throw new BadRequestError(errors);
    }

    return res.status(201).json("it is working");
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
