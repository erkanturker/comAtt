const express = require("express");
const {
  ensureCorrectUserOrAdmin,
  ensureIsAdmin,
} = require("../middleware/auth");
const Attendance = require("../models/attendance");
const { BadRequestError } = require("../expressError");
const {
  createAttendanceSchema,
  updateAttendanceSchema,
  periodAttendance,
} = require("../validators/attendancesValidators");
const { date } = require("joi");
const Period = require("../models/period");

const router = express.Router();

/**
 * POST /attendances
 * Creates a new attendance record. Only admin can send request.
 *
 * Request Body:
 * {
 *   "studentId": 1,
 *   "periodId": 1,
 *   "date": "2024-01-07",
 *   "status": true
 * }
 *
 * Response:
 * - 201: Created
 *   {
 *     "attendanceId": 1,
 *     "studentId": 1,
 *     "periodId": 1,
 *     "date": "2024-01-07",
 *     "status": true
 *   }
 * - 400: Bad Request (validation errors)
 */
router.post("/", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const { error } = createAttendanceSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((e) => e.message);
      throw new BadRequestError(errors);
    }

    const newAttendance = await Attendance.create(req.body);
    return res.status(201).json(newAttendance);
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /attendances
 * Retrieves a list of all attendance records. Admin or correct user can access.
 *
 * Response:
 * - 200: OK
 *   {
 *     "attendances": [
 *       {
 *         "attendanceId": 1,
 *         "studentId": 1,
 *         "periodId": 1,
 *         "date": "2024-01-07",
 *         "status": true
 *       },
 *       ...
 *     ]
 *   }
 * - 401: Unauthorized (if the user does not have the correct permissions)
 */
router.get("/", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const attendances = await Attendance.getAll();
    return res.json(attendances);
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /attendancesByCurrentTerm
 * 
 * Retrieves all attendance records for the current term.
 * Only accessible by users with the correct role (user or admin).
 *   
 * Response:
 * - 200: OK, returns an array of attendance records where each record contains
 *  Response:
 * - 200: OK, returns an array of attendance records:
 [{ "attendanceId": number, "studentId": number, "status": boolean, "periodId": number, 
  "periodNumber": number, "subjectId": number, "groupId": number, "date": string,
   "termId": number, "startDate": string, "endDate": string },
 *     ...
 *   ]
 * - 401: Unauthorized, if the user does not have the required authorization.
 */

router.get(
  "/attendancesByCurrentTerm",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      const attendances = await Attendance.getAttendancesByCurrentTerm();
      return res.json(attendances);
    } catch (err) {
      return next(err);
    }
  }
);

/**
 * GET /attendances/:attendanceId
 * Retrieves an attendance record by its ID. Admin or correct user can access.
 *
 * Path Parameters:
 * - attendanceId: integer, required, the ID of the attendance record to retrieve.
 *
 * Response:
 * - 200: OK
 *   {
 *     "attendanceId": 1,
 *     "studentId": 1,
 *     "periodId": 1,
 *     "date": "2024-01-07",
 *     "status": true
 *   }
 * - 404: Not Found (if the attendance record does not exist)
 * - 401: Unauthorized (if the user does not have the correct permissions)
 */
router.get(
  "/:attendanceId",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      const attendance = await Attendance.getById(req.params.attendanceId);
      return res.json(attendance);
    } catch (err) {
      return next(err);
    }
  }
);

/**
 * PATCH /attendances/:attendanceId
 * Updates an attendance record by its ID. Only admin can send request.
 *
 * Path Parameters:
 * - attendanceId: integer, required, the ID of the attendance record to update.
 *
 * Request Body:
 * - Optional fields to update:
 *   - studentId: integer, the new student ID.
 *   - periodId: integer, the new period ID.
 *   - date: string, the new date (YYYY-MM-DD).
 *   - status: boolean, the new status.
 *
 * Response:
 * - 200: OK
 *   {
 *     "attendanceId": 1,
 *     "studentId": 1,
 *     "periodId": 1,
 *     "date": "2024-01-07",
 *     "status": true
 *   }
 * - 400: Bad Request (validation errors)
 * - 404: Not Found (if the attendance record does not exist)
 */
router.patch(
  "/:attendanceId",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      await Attendance.getById(req.params.attendanceId);

      const { error } = updateAttendanceSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((e) => e.message);
        throw new BadRequestError(errors);
      }

      const updatedAttendance = await Attendance.update(
        req.params.attendanceId,
        req.body
      );
      return res.json(updatedAttendance);
    } catch (err) {
      return next(err);
    }
  }
);

/**
 * DELETE /attendances/:attendanceId
 * Deletes an attendance record by its ID. Only admin can send request.
 *
 * Path Parameters:
 * - attendanceId: integer, required, the ID of the attendance record to delete.
 *
 * Response:
 * - 200: OK
 *   {
 *     "status": "deleted"
 *   }
 * - 404: Not Found (if the attendance record does not exist)
 */
router.delete(
  "/:attendanceId",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      await Attendance.remove(req.params.attendanceId);
      return res.json({ status: "deleted" });
    } catch (err) {
      return next(err);
    }
  }
);

/**
 * POST /:periodId/periodAttendance
 * Records attendance for a specified period. Only admin or the correct user can send a request.
 *
 * Path Parameters:
 * - periodId: string, required, the ID of the period.
 *
 * Request Body:
 *{
    "date": "06-06-2024",
    "classAttendances": [
        {
            "studentId": "29",
            "status": true
        },
        {
            "studentId": "30",
            "status": true
        ]}
 *
 * Response:
 * - 201: Created
 
 * - 404: Not Found (if the period does not exist)
 */
router.post(
  "/:periodId/periodAttendance",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      const periodId = req.params.periodId;
      await Period.getById(periodId);

      const { error } = periodAttendance.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errors = error.details.map((detail) => detail.message);
        throw new BadRequestError(errors);
      }

      const { attendances, date } = req.body;

      await Attendance.periodAttendance(periodId, attendances, date);
      await Period.update(periodId, { attendanceTaken: true });
      return res.status(201).json({
        message:
          "Attendance for the selected period has been recorded successfully. ",
      });
    } catch (err) {
      return next(err);
    }
  }
);

/**
 * GET /:periodId/periodAttendance
 * Retrieves attendance records for a specified period. Only admin or the correct user can send a request.
 * Path Parameters:
 * - periodId: string, required, the ID of the period.
 * Response:
 * - 200: OK
 *   [
 *     {
 *       "attendanceId": integer,
 *       "studentId": integer,
 *       "periodId": integer,
 *       "date": string,
 *       "status": boolean
 *     },
 *   ]
 * - 404: Not Found (if the period does not exist)
 */

router.get(
  "/:periodId/periodAttendance",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      const periodId = req.params.periodId;
      await Period.getById(periodId);

      const attendances = await Attendance.getAttendanceByPeriod(periodId);
      res.json(attendances);
    } catch (err) {
      return next(err);
    }
  }
);

/**
 * PATCH /:periodId/updatePeriodAttendance
 * Updates the attendance status for a specified period. Only admin or the correct user can send a request.
 *
 * Path Parameters:
 * - periodId: string, required, the ID of the period.
 *
 * Request Body:
 * {
    "date": "06-06-2024",
    "classAttendances": [
        {
            "studentId": "29",
            "status": true
        },
        {
            "studentId": "30",
            "status": true
        ]}
 *
 * Response:
 * - 200: OK

 * - 404: Not Found (if the period does not exist)
 */

router.patch(
  "/:periodId/updatePeriodAttendance",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      const periodId = req.params.periodId;
      await Period.getById(periodId);

      const { error } = periodAttendance.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errors = error.details.map((detail) => detail.message);
        throw new BadRequestError(errors);
      }

      const { attendances, date } = req.body;
      await Attendance.switchStatusOfAttendance(periodId, attendances, date);
      return res.status(200).json({
        message:
          "Attendance for the selected period has been updated successfully.",
      });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
