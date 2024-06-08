const express = require("express");
const Term = require("../models/term");
const { BadRequestError, NotFoundError } = require("../expressError");
const { createTermSchema } = require("../validators/termsValidators");
const {
  ensureIsAdmin,
  ensureCorrectUserOrAdmin,
} = require("../middleware/auth");

const router = express.Router();

/**
 * POST /terms
 * Creates a new term. The request body must include termName, and optionally startDate and endDate.
 * Authentication: admin only
 *
 * Request Body:
 * {
 *   "termName": "Spring 2024",
 *   "startDate": "2024-01-01",
 *   "endDate": "2024-05-31"
 * }
 *
 * Responses:
 * - 201: Created
 *   {
 *     "termId": 1,
 *     "termName": "Spring 2024",
 *     "startDate": "2024-01-01",
 *     "endDate": "2024-05-31"
 *   }
 *
 * - 400: Bad Request (validation errors)
 */
router.post("/", ensureIsAdmin, async (req, res, next) => {
  try {
    const { error } = createTermSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((e) => e.message);
      throw new BadRequestError(errors);
    }

    const term = await Term.create(req.body);
    return res.status(201).json(term);
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /terms
 * Retrieves a list of all terms.
 * Authentication: teacher or admin
 * Responses:
 * - 200: OK
 *   {
 *     "terms": [
 *       {
 *         "termId": 1,
 *         "termName": "Spring 2024",
 *         "startDate": "2024-01-01",
 *         "endDate": "2024-05-31"
 *       },
 *       ...
 *     ]
 *   }
 */
router.get("/", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const terms = await Term.getAll();
    return res.json(terms);
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /terms/:termId
 * Retrieves a term by ID.
 * Authentication: teacher or admin
 *
 * Path Parameters:
 * - termId: integer, required, the ID of the term to retrieve.
 *
 * Responses:
 * - 200: OK
 *   {
 *     "termId": 1,
 *     "termName": "Spring 2024",
 *     "startDate": "2024-01-01",
 *     "endDate": "2024-05-31"
 *   }
 * - 404: Not Found (if the term does not exist)
 */
router.get("/:termId", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const term = await Term.get(req.params.termId);
    return res.json(term);
  } catch (err) {
    return next(err);
  }
});

/**
 * PATCH /terms/:termId
 * Updates a term by ID. The request body can include termName, startDate, and/or endDate.
 * Authentication: admin only
 *
 * Path Parameters:
 * - termId: integer, required, the ID of the term to update.
 *
 * Request Body:
 * - Optional fields to update:
 *   - termName: string, the new name of the term.
 *   - startDate: date, the new start date of the term.
 *   - endDate: date, the new end date of the term.
 *
 * Responses:
 * - 200: OK
 *   {
 *     "termId": 1,
 *     "termName": "Updated Spring 2024",
 *     "startDate": "2024-01-01",
 *     "endDate": "2024-05-31"
 *   }
 * - 400: Bad Request (validation errors)
 * - 404: Not Found (if the term does not exist)
 */
router.patch("/:termId", ensureIsAdmin, async (req, res, next) => {
  try {
    const { error } = createTermSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((e) => e.message);
      throw new BadRequestError(errors);
    }

    const term = await Term.update(req.params.termId, req.body);
    return res.json(term);
  } catch (err) {
    return next(err);
  }
});

/**
 * DELETE /terms/:termId
 * Deletes a term by ID.
 * Authentication: admin only
 *
 * Path Parameters:
 * - termId: integer, required, the ID of the term to delete.
 *
 * Responses:
 * - 200: OK
 * - 404: Not Found (if the term does not exist)
 */
router.delete("/:termId", ensureIsAdmin, async (req, res, next) => {
  try {
    await Term.remove(req.params.termId);
    return res.json({ status: "deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
