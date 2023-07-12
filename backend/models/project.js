"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


/** Related functions for projects. */

class Project {
  /** 
   * Data should be { title, description, manager, deadline, status }
   *
   * Returns { id, title, description, manager, deadline, status }
   **/
  static async findAll(searchFilters = {}) {
    let query = `SELECT id,
                        title,
                        description,
                        manager,
                        deadline,
                        status
                 FROM projects`;
    let whereExpressions = [];
    let queryValues = [];

    const { search } = searchFilters;

    if (search) {
      queryValues.push(`%${search}%`);
      whereExpressions.push(`title ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" OR ");
    }

    // Finalize query and return results
    query += " ORDER BY id";
    const projectsRes = await db.query(query, queryValues);
    return projectsRes.rows;
  }

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
    let project = result.rows[0];

    return project;
  }

  static async get(id) {
    const projectRes = await db.query(
      `SELECT id,
              title,
              description,
              manager,
              deadline,
              status
       FROM projects
       WHERE id = $1`, [id]);

    const project = projectRes.rows[0];

    if (!project) throw new NotFoundError(`No project: ${id}`);

    return project;
  }

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
      data,
      {});
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

  static async remove(id) {
    const result = await db.query(
      `DELETE
       FROM projects
       WHERE id = $1
       RETURNING id`, [id]);
    const project = result.rows[0];

    if (!project) throw new NotFoundError(`No project: ${id}`);
  }
}


module.exports = Project;
