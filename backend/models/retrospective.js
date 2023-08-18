const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for retrospectives. */
class Retrospective {
  /**
   * Find all retrospectives based on given search filters.
   *
   * @param {Object} searchFilters - Filters to search retrospectives.
   * @returns {Array} - Array of retrospectives.
   */
  static async findAll(searchFilters = {}) {
    let query = `SELECT id,
                        facilitator,
                        start_doing,
                        stop_doing,
                        continue_doing,
                        action_items,
                        lessons_learned,
                        participant_name,
                        project_id,
                        created_at,
                        updated_at
                 FROM retrospectives`;
    let whereExpressions = [];
    let queryValues = [];

    const { search } = searchFilters;

    if (search) {
      queryValues.push(`%${search}%`);
      whereExpressions.push(`participant_name ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" OR ");
    }

    // Finalize query and return results
    query += " ORDER BY id";
    const retrospectivesRes = await db.query(query, queryValues);
    return retrospectivesRes.rows;
  }

  /**
   * Create a new retrospective.
   *
   * @param {Object} data - Data for the new retrospective.
   * @returns {Object} - Created retrospective.
   */
  static async create(data) {
    const result = await db.query(
      `INSERT INTO retrospectives (facilitator, start_doing, stop_doing, continue_doing, action_items, lessons_learned, participant_name, project_id, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, current_timestamp, current_timestamp)
       RETURNING id, facilitator, start_doing, stop_doing, continue_doing, action_items, lessons_learned, participant_name, project_id, created_at, updated_at`,
      [
        data.facilitator,
        data.start_doing,
        data.stop_doing,
        data.continue_doing,
        data.action_items,
        data.lessons_learned,
        data.participant_name,
        data.project_id
      ]
    );
    let retrospective = result.rows[0];

    return retrospective;
  }

  /**
   * Get a retrospective by its id.
   *
   * @param {number} id - Id of the retrospective.
   * @returns {Object} - Retrospective.
   * @throws {NotFoundError} - If retrospective is not found.
   */
  static async get(id) {
    const retrospectiveRes = await db.query(
      `SELECT id,
              facilitator,
              start_doing,
              stop_doing,
              continue_doing,
              action_items,
              lessons_learned,
              participant_name,
              project_id,
              created_at,
              updated_at
       FROM retrospectives
       WHERE id = $1`,
      [id]
    );

    const retrospective = retrospectiveRes.rows[0];

    if (!retrospective) throw new NotFoundError(`No retrospective: ${id}`);

    return retrospective;
  }

  /**
   * Update a retrospective by its id.
   *
   * @param {number} id - Id of the retrospective to update.
   * @param {Object} data - Data to update the retrospective.
   * @returns {Object} - Updated retrospective.
   * @throws {NotFoundError} - If retrospective is not found.
   */
  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE retrospectives 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                facilitator,
                                start_doing,
                                stop_doing,
                                continue_doing,
                                action_items,
                                lessons_learned,
                                participant_name,
                                project_id,
                                created_at,
                                updated_at`;
    const result = await db.query(querySql, [...values, id]);
    const retrospective = result.rows[0];

    if (!retrospective) throw new NotFoundError(`No retrospective: ${id}`);

    return retrospective;
  }

  /**
   * Remove a retrospective by its id.
   *
   * @param {number} id - Id of the retrospective to remove.
   * @throws {NotFoundError} - If retrospective is not found.
   */
  static async remove(id) {
    const result = await db.query(
      `DELETE
       FROM retrospectives
       WHERE id = $1
       RETURNING id`,
      [id]
    );
    const retrospective = result.rows[0];

    if (!retrospective) throw new NotFoundError(`No retrospective: ${id}`);
  }
}

module.exports = Retrospective;

