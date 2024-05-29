const express = require("express");
const Period = require("../models/period");
const {
  ensureIsAdmin,
  ensureCorrectUserOrAdmin,
} = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const {
  createPeriodSchema,
  updatePeriodSchema,
} = require("../validators/periodsValidators");
const Subject = require("../models/subject");
const Group = require("../models/group");
const Term = require("../models/term");

const router = express.Router();

/**
 * POST /periods
 * Creates a new period only admin  can send request.
 
 * Request Body:
 * {
 *   "periodNumber": 1,
 *   "subjectId": 1,
 *   "groupId": 1,
 *   "termId": 1,
 *   "date": "2024-01-07"
 * }
 
 * Response:
 * - 201: Created
 *   {
 *     "periodId": 1,
 *     "periodNumber": 1,
 *     "subjectId": 1,
 *     "groupId": 1,
 *     "termId": 1,
 *     "date": "2024-01-07"
 *   }
 * - 400: Bad Request (validation errors)
 */
router.post("/", ensureIsAdmin, async (req, res, next) => {
  try {
    const { error } = createPeriodSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((e) => e.message);
      throw new BadRequestError(errors);
    }

    await Group.getGroup(req.body.groupId);
    await Subject.get(req.body.subjectId);

    const newPeriod = await Period.create({ ...req.body });
    return res.status(201).json(newPeriod);
  } catch (err) {
    return next(err);
  }
});
/**
 * GET /periods
 * Retrieves a list of all periods.
 * Authentication: correct teacher or admin

 * Response:
 * - 200: OK
 *   {
 *     "periods": [
 *       {
 *         "periodId": 1,
 *         "periodNumber": 1,
 *         "subjectId": 1,
 *         "groupId": 1,
 *         "termId": 1,
 *         "date": "2024-01-07"
 *       },
 *       ...
 *     ]
 *   }
 * - 401: Unauthorized (if the user does not have the correct permissions)
 */

router.get("/", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const periods = await Period.getAll();
    return res.json({ periods });
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /periods/:periodId
 * Retrieves a period by its ID.
 * Path Parameters:
 * - periodId: integer, required, the ID of the period to retrieve.
 *
 * Authentication: correct teacher or admin
 *
 * Response:
 * - 200: OK
 *   {
 *     "periodId": 1,
 *     "periodNumber": 1,
 *     "subjectId": 1,
 *     "groupId": 1,
 *     "termId": 1,
 *     "date": "2024-01-07"
 *   }
 * - 404: Not Found (if the period does not exist)
 * - 401: Unauthorized (if the user does not have the correct permissions)
 */

router.get("/:periodId", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const periods = await Period.getById(req.params.periodId);
    return res.json(periods);
  } catch (err) {
    return next(err);
  }
});

/**
 * PATCH /periods/:periodId
 * Updates a period by its ID.
 * Path Parameters:
 * - periodId: integer, required, the ID of the period to update.
 *  Authentication: admin only

 * Request Body:
 * - Optional fields to update:
 *   - periodNumber: integer, the new period number.
 *   - subjectId: integer, the new subject ID.
 *   - groupId: integer, the new group ID.
 *   - termId: integer, the new term ID.
 *   - date: string, the new date (YYYY-MM-DD).

 * Response:
 * - 200: OK
 *   {
 *     "periodId": 1,
 *     "periodNumber": 2,
 *     "subjectId": 2,
 *     "groupId": 2,
 *     "termId": 2,
 *     "date": "2024-01-14"
 *   }
 * - 400: Bad Request (validation errors)
 * - 404: Not Found (if the period, group, subject, or term does not exist)
 */

router.patch("/:periodId", ensureIsAdmin, async (req, res, next) => {
  try {
    await Period.getById(req.params.periodId);

    const { error } = updatePeriodSchema.validate(req.body);

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      throw new BadRequestError(errors);
    }

    if (req.body.groupId) await Group.getGroup(req.body.groupId);
    if (req.body.subjectId) await Subject.get(req.body.subjectId);
    if (req.body.termId) await Term.get(req.body.termId);

    const period = await Period.update(req.params.periodId, req.body);
    return res.json(period);
  } catch (err) {
    return next(err);
  }
});

/**
 * DELETE /periods/:periodId
 *
 * Deletes a period by its ID.
 *
 * Path Parameters:
 * - periodId: integer, required, the ID of the period to delete.
 *
 * Authentication: admin only
 *
 * Response:
 * - 200: OK
 *   {
 *     "status": "deleted"
 *   }
 * - 404: Not Found (if the period does not exist)
 */

router.delete("/:periodId", ensureIsAdmin, async (req, res, next) => {
  try {
    const periods = await Period.remove(req.params.periodId);
    return res.json({ status: "deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
