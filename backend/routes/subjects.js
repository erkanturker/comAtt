const express = require("express");
const { BadRequestError, NotFoundError } = require("../expressError");
const {
  createSubjectSchema,
  updateSubjectSchema,
} = require("../validators/subjectsValidators");
const User = require("../models/user");
const Subject = require("../models/subject");
const {
  ensureIsAdmin,
  ensureCorrectUserOrAdmin,
} = require("../middleware/auth");

const router = express.Router();

/**
 * POST /subjects
 * Creates a new subject. The request body must include subjectName and teacherId.
 
 * Authentication: admin only
 *
 * Request Body:
 * {
 *   "subjectName": "Mathematics",
 *   "teacherId": "teacher1"
 * }
 *
 * Responses:
 * - 201: Created
 *   {
 *     "subjectId": 1,
 *     "subjectName": "Mathematics",
 *     "teacherId": "teacher1"
 *   }
 * - 400: Bad Request (validation errors)
 * - 404: Not Found (if the teacher does not exist)
 */
router.post("/", ensureIsAdmin, async (req, res, next) => {
  try {
    const { error } = createSubjectSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((e) => e.message);
      throw new BadRequestError(errors);
    }

    const { teacherId } = req.body;
    const teacher = await User.get(teacherId);
    if (!teacher) {
      throw new BadRequestError(`No teacher found with id: ${teacherId}`);
    }

    const newSubject = await Subject.create(req.body);
    return res.status(201).json(newSubject);
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /subjects
 *
 * Retrieves a list of all subjects. This route can be accessed by users with correct permissions (correct user or admin).
 * Authentication: correct teacher or admin
 *
 * Responses:
 * - 200: OK
 *   {
 *     "subjects": [
 *       {
 *         "subjectId": 1,
 *         "subjectName": "Mathematics",
 *         "teacherId": "teacher1"
 *       },
 *       ...
 *     ]
 *   }
 * - 401: Unauthorized (if the user does not have the correct permissions)
 */

router.get("/", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const subjects = await Subject.getAll();
    return res.json(subjects);
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /subjects/:subjectId
 * Retrieves a subject by its ID. This route can be accessed by users with correct permissions (teacher user or admin).

 * Path Parameters:
 * - subjectId: integer, required, the ID of the subject to retrieve.
 * 
 * Responses:
 * - 200: OK
 *   {
 *     "subjectId": 1,
 *     "subjectName": "Mathematics",
 *     "teacherId": "teacher1"
 *   }
 * - 404: Not Found (if the subject does not exist)
 * - 401: Unauthorized (if the user does not have the correct permissions)
 */
router.get("/:subjectId", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const subject = await Subject.get(req.params.subjectId);
    return res.json(subject);
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res
        .status(404)
        .json({ error: `No subject: ${req.params.subjectId}` });
    }
    return next(err);
  }
});

/**
 * PATCH /subjects/:subjectId
 * Updates a subject by its ID. The request body can include subjectName and/or teacherId.
 * Authentication: admin only
 *
 * Path Parameters:
 * - subjectId: integer, required, the ID of the subject to update.
 *
 * Request Body:
 * - Optional fields to update:
 *   - subjectName: string, the new name of the subject.
 *   - teacherId: string, the new ID of the teacher.
 *
 * Responses:
 * - 200: OK
 *   {
 *     "subjectId": 1,
 *     "subjectName": "Updated Mathematics",
 *     "teacherId": "teacher2"
 *   }
 * - 400: Bad Request (validation errors)
 * - 404: Not Found (if the subject or teacher does not exist)
 * - 401: Unauthorized (if the user is not an admin)
 */
router.patch("/:subjectId", ensureIsAdmin, async (req, res, next) => {
  try {
    const { error } = updateSubjectSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((e) => e.message);
      throw new BadRequestError(errors);
    }

    if (req.body.teacherId) await User.get(req.body.teacherId);

    const subject = await Subject.update(req.params.subjectId, req.body);
    return res.json(subject);
  } catch (err) {
    return next(err);
  }
});

/**
 * DELETE /subjects/:subjectId
 * Deletes a subject by its ID. This route can be accessed by users with correct permissions only admin).  
 * Path Parameters:
 * - subjectId: integer, required, the ID of the subject to delete.
 * 
 * Responses:
 * - 200: OK
 *   {
 *     "status": "deleted"
 *   }
 * - 404: Not Found (if the subject does not exist)

 * - 401: Unauthorized (if the user does not have the correct permissions)
 */

router.delete("/:subjectId", ensureIsAdmin, async (req, res, next) => {
  try {
    await Subject.remove(req.params.subjectId);
    return res.json({ status: "deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
