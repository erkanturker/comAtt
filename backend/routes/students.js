const express = require("express");
const Student = require("../models/student");
const {
  ensureIsAdmin,
  ensureCorrectUserOrAdmin,
} = require("../middleware/auth");
const {
  createStudentSchema,
  updateStudentSchema,
} = require("../validators/studentsValidators");
const { BadRequestError } = require("../expressError");
const Group = require("../models/group");

const router = express.Router();

/**
 * POST /students
 * 
 * Creates a new student. The request body must include the following fields:
 
 * Authentication: admin only
 * 
 * Request Body:
 * {
 *   "groupId": 1,
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "age": 10,
 *   "parentFirstName": "Jane",
 *   "parentLastName": "Doe",
 *   "parentPhone": "123-456-7890",
 *   "parentEmail": "jane.doe@example.com"
 * }
 * 
 * Responses:
 * - 201: Created
 *   {
 *     "student": {
 *       "studentId": 1,
 *       "groupId": 1,
 *       "firstName": "John",
 *       "lastName": "Doe",
 *       "age": 10,
 *       "parentFirstName": "Jane",
 *       "parentLastName": "Doe",
 *       "parentPhone": "123-456-7890",
 *       "parentEmail": "jane.doe@example.com"
 *     }
 *   }
 * - 400: Bad Request (validation errors)
 */

router.post("/", ensureIsAdmin, async (req, res, next) => {
  try {
    const { error } = createStudentSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((e) => e.message);
      throw new BadRequestError(errors);
    }

    //checking group id
    await Group.getGroup(req.body.groupId);

    const student = await Student.create({ ...req.body });

    return res.status(201).json( student );
  } catch (err) {
    return next(err);
  }
});
/**
 * GET /students
 *
 * Retrieves a list of all students. Only the correct teacher or an admin can access this route.
 * Responses:
 * - 200: OK
 *   {
 *     "students": [
 *       {
 *         "studentId": 1,
 *         "groupId": 1,
 *         "firstName": "John",
 *         "lastName": "Doe",
 *         "age": 10,
 *         "parentFirstName": "Jane",
 *         "parentLastName": "Doe",
 *         "parentPhone": "123-456-7890",
 *         "parentEmail": "jane.doe@example.com"
 *       } ...
 *     ]
 *   }
 * - 401: Unauthorized (if the user is not authorized)
 */

router.get("/", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const students = await Student.getAll();
    return res.json( students );
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /students/:studentId
 * 
 * Retrieves a student by ID. Only the correct teacher or an admin can access this route.

 * Path Parameters:
 * - studentId: integer, required, the ID of the student to retrieve.

 * Responses:
 * - 200: OK
 *   {
 *     "studentId": 1,
 *     "groupId": 1,
 *     "firstName": "John",
 *     "lastName": "Doe",
 *     "age": 10,
 *     "parentFirstName": "Jane",
 *     "parentLastName": "Doe",
 *     "parentPhone": "123-456-7890",
 *     "parentEmail": "jane.doe@example.com"
 *   }
 * - 404: Not Found (if the student does not exist)
 */

router.get("/:studentId", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const student = await Student.get(req.params.studentId);
    return res.json(student);
  } catch (err) {
    return next(err);
  }
});

/**
 * PATCH /students/:studentId
 *
 * Updates a student by ID. Only an admin can access this route.

 * Path Parameters:
 * - studentId: integer, required, the ID of the student to update.

 * Request Body:
 * - Optional fields to update, which may include: groupId, firstName lastNAme age, parentFirstName
 * parentLastName parentPhone parentEmail

 * Responses:
 * - 200: OK
 *   {
 *     "studentId": 1,
 *     "groupId": 1,
 *     "firstName": "UpdatedFirstName",
 *     "lastName": "Doe",
 *     "age": 10,
 *     "parentFirstName": "Jane",
 *     "parentLastName": "Doe",
 *     "parentPhone": "123-456-7890",
 *     "parentEmail": "jane.doe@example.com"
 *   }
 * - 400: Bad Request (validation errors)
 * - 404: Not Found (if the student or groupId does not exist)
 * - 401: Unauthorized (if the user is not an admin)

 */

router.patch("/:studentId", ensureIsAdmin, async (req, res, next) => {
  try {
    //check student
    await Student.get(req.params.studentId);

    const { error } = updateStudentSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((e) => e.message);
      throw new BadRequestError(errors);
    }

    //checking group id
    if (req.body.groupId) await Group.getGroup(req.body.groupId);

    const student = await Student.update(req.params.studentId, req.body);
    return res.json(student);
  } catch (err) {
    return next(err);
  }
});

/**
 * DELETE /students/:studentId
 * Deletes a student by ID. Only an admin can access this route. 
 * Path Parameters:
 * - studentId: integer, required, the ID of the student to delete.
 * 
 * Responses:
 * - 200: OK "status": "deleted"
 * - 404: Not Found (if the student does not exist)
 * - 401: Unauthorized (if the user is not an admin)

 */

router.delete("/:studentId", ensureIsAdmin, async (req, res, next) => {
  try {
    await Student.remove(req.params.studentId);
    return res.json({ status: "deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
