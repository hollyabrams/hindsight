const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


/** Related functions for projects. */

class Project {
  
  /** Returns array of basic project info:
   * [{ id, title, description, manager, deadline, status }, ...]
  **/
  static async findAll() {
    const result = await db.query(
      `SELECT id,
              title,
              description,
              manager,
              deadline,
              status
       FROM projects
       ORDER BY id`
    );

    return result.rows;
  }

  /** Given a project id
   * Returns { id, title, description, manager, deadline, status }
   *
   * Throws NotFoundError if not found.
   **/
  static async get(id) {
    const projectRes = await db.query(
      `SELECT id,
              title,
              description,
              manager,
              deadline,
              status
       FROM projects
       WHERE id = $1`,
      [id]
    );

    const project = projectRes.rows[0];

    if (!project) throw new NotFoundError(`No project: ${id}`);

    return project;
  }

  /** Given project data, creates a new project
   * Returns { id, title, description, manager, deadline, status }
   **/
  static async create(data) {
    const result = await db.query(
      `INSERT INTO projects (title, description, manager, deadline, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, title, description, manager, deadline, status`,
      [
        data.title,
        data.description,
        data.manager,
        data.deadline,
        data.status
      ]);

    return result.rows[0];
  }

  /** Update project data with `data`
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include: {title, description, manager, deadline, status}
   *
   * Returns {id, title, description, manager, deadline, status}
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE projects 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                title,
                                description,
                                manager,
                                deadline,
                                status`;
    const result = await db.query(querySql, [...values, id]);
    const project = result.rows[0];

    if (!project) throw new NotFoundError(`No project: ${id}`);

    return project;
  }

  /** Delete given project from database; returns undefined.
   *
   * Throws NotFoundError if project not found.
   **/

  static async remove(id) {
    const result = await db.query(
      `DELETE
       FROM projects
       WHERE id = $1
       RETURNING id`, [id]);
  
    if (result.rows.length === 0) {
      throw new NotFoundError(`No project: ${id}`);
    }
  }  
}

module.exports = Project;

