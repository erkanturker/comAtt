const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

class Group {
  /**
   * Check if a group with the specified name already exists.
   */
  static async checkDuplicateGroup(groupName) {
    const result = await db.query(
      `SELECT group_name
            FROM groups
            WHERE group_name=$1`,
      [groupName]
    );

    return result.rows.length > 0;
  }

  /**
   * Create a new group.
   * return object {groupId ,groupName}
   * @throws {BadRequestError} - If the group name already exists or validation fails.
   */

  static async create(groupName) {
    const isDuplicaite = await this.checkDuplicateGroup(groupName);

    if (isDuplicaite) {
      throw new BadRequestError(`${groupName} is already exist`);
    }

    const result = await db.query(
      `INSERT INTO groups
            (group_name)
            VALUES ($1)
            RETURNING group_id AS "groupId", group_name AS "groupName" `,
      [groupName]
    );
    const group = result.rows[0];

    return group;
  }

  /**
   * Retrieve all groups.
   * @returns {Array} - A list of all groups.  "groups": [{grouId,groupName}]
   * 

   */
  static async getAll() {
    const result = await db.query(
      `SELECT
         group_id AS "groupId", group_name AS "groupName"
        FROM groups`
    );

    const groups = result.rows;

    return groups;
  }

  /**
   * Retrieve group by id
   * @returns {object} -{grouId,groupName}
   * @throws {NotFoundError} - If the group name does not exist
   */
  static async getGroup(groupId) {
    const result = await db.query(
      `SELECT
           group_id AS "groupId", group_name AS "groupName"
          FROM groups
          WHERE group_id=$1`,
      [groupId]
    );

    const group = result.rows[0];

    if (group) {
      return group;
    }

    throw new NotFoundError(`The group is not found with id: ${groupId}`);
  }

  /**
   * REmove group by id
   * @returns {Number} -group Id
   * @throws {NotFoundError} - If the group name does not exist
   */

  static async remove(groupId) {
    const result = await db.query(
      `DELETE FROM groups
        WHERE group_id=$1
        RETURNING group_id`,
      [groupId]
    );

    const id = result.rows[0];

    if (!id)
      throw new NotFoundError(`The group is not found with id: ${groupId}`);

    return id;
  }
  /**
   * Update group data.

   * @param {number} id - The ID of the group to update.
   * @returns {object} - {grouId,groupName}.
   * @throws {BadRequestError} - If the group name already exists or validation fails.
   * @throws {NotFoundError} - If the group is not found.
   */

  static async update(groupId, groupName) {
    await this.getGroup(groupId);

    const isDuplicaite = await this.checkDuplicateGroup(groupName);

    if (isDuplicaite) {
      throw new BadRequestError(`${groupName} is already exist`);
    }

    const result = await db.query(
      `UPDATE groups
        SET  group_name = $1
        WHERE group_id=$2
        RETURNING group_id AS "groupId", group_name AS "groupName" `,
      [groupName, groupId]
    );
    const group = result.rows[0];

    return group;
  }
}

module.exports = Group;
