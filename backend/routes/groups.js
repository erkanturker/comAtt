const express = require("express");
const { ensureIsAdmin } = require("../middleware/auth");
const Group = require("../models/group");
const { validateGroupInfo } = require("../validators/groupsValidators");
const { BadRequestError } = require("../expressError");

const router = express.Router();

/**
 * POST /groups/
 * This route creates a new group. Only accessible by admin users.
 *
 * Request body:
 * - groupName (string): The name of the group to be created.
 *
 *  Response:
 *  {
 *   "groupId": 1,
 *   "groupName": "New Group"
 * }
 */

router.post("/", ensureIsAdmin, async (req, res, next) => {
  try {
    const { error } = await validateGroupInfo.validate(req.body);

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      throw new BadRequestError(errors);
    }

    const group = await Group.create(req.body.groupName);

    return res.status(201).json(group);
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /groups/
 This route retrieves all groups. Only accessible by admin users.
 *
 * Response:
 * {
 *   "groups": [
 *     {
 *       "groupId": 1,
 *       "groupName": "Group 1"
 *     },
 *     {
 *       "groupId": 2,
 *       "groupName": "Group 2"
 *     }
 *   ]
 * }
 */

router.get("/", ensureIsAdmin, async (req, res, next) => {
  try {
    const groups = await Group.getAll();

    return res.status(200).json(groups);
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /groups/:id
 * This route retrieves a group by its ID. Only accessible by admin users.
 * Request params:
 * - id (number): The ID of the group to retrieve.
 * Response:
 * {
 *   "groupId": 1,
 *   "groupName": "Group 1"
 * }
 */

router.get("/:id", ensureIsAdmin, async (req, res, next) => {
  try {
    const group = await Group.getGroup(req.params.id);

    return res.status(200).json(group);
  } catch (err) {
    return next(err);
  }
});

/**
 * DELETE /groups/:id
 * This route deletes a group by its ID. Only accessible by admin users.
 *
 * Request params:
 * - id (number): The ID of the group to delete.

 * Response:
 * {
 *   "status": "deleted"
 * }
 */
router.delete("/:id", ensureIsAdmin, async (req, res, next) => {
  try {
    await Group.remove(req.params.id);
    return res.status(200).json({ status: "deleted" });
  } catch (err) {
    return next(err);
  }
});

/**
 * PATCH /groups/:id
 * This route updates a group by its ID. Only accessible by admin users.
 * Request params:
 * - id (number): The ID of the group to update.
 * Request body:
 * - groupName (string): The new name of the group.
 *
 * PATCH /groups/1
 * {
 *   "groupName": "Updated Group"
 * }
 *
 * Response:
 * {
 *   "groupId": 1,
 *   "groupName": "Updated Group"
 * }
 */

router.patch("/:id", ensureIsAdmin, async (req, res, next) => {
  try {
    const { error } = await validateGroupInfo.validate(req.body);

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      throw new BadRequestError(errors);
    }

    const group = await Group.update(req.params.id, req.body.groupName);

    return res.status(200).json(group);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
