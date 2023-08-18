const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testProjectIds = [];

/**
 * Clears all data from tables: retrospectives, projects, and users.
 * Adds some projects, users, and retrospectives for testing.
 */
async function commonBeforeAll() {
  // Delete all tables data
  await db.query("DELETE FROM retrospectives");
  await db.query("DELETE FROM projects");
  await db.query("DELETE FROM users");

  // Add some projects
  const projectData = [
    {
      title: "Project Alpha",
      description: "Description for Project Alpha.",
      manager: 1,
      deadline: "2023-12-31",
      status: "planned",
      created_by: 1,
    },
    {
      title: "Project Beta",
      description: "Description for Project Beta.",
      manager: 2,
      deadline: "2023-11-30",
      status: "in progress",
      created_by: 2,
    },
  ];

  // Insert projects and collect their ids
  const projectRes = await Promise.all(
    projectData.map(async (project) => {
      const { rows } = await db.query(
        `
        INSERT INTO projects (title, description, manager, deadline, status, created_by)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `,
        Object.values(project)
      );
      return rows[0].id;
    })
  );

  testProjectIds.push(...projectRes);

  // Add some users
  const userData = [
    {
      username: "u1",
      password: "password1",
      first_name: "U1F",
      last_name: "U1L",
      email: "u1@email.com",
    },
    {
      username: "u2",
      password: "password2",
      first_name: "U2F",
      last_name: "U2L",
      email: "u2@email.com",
    },
  ];

  // Hash passwords and insert users
  const hashedUserData = await Promise.all(
    userData.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, BCRYPT_WORK_FACTOR);
      return { ...user, password: hashedPassword }; // replaces plain-text password with hashed password
    })
  );

  const userValues = hashedUserData.flatMap(user => Object.values(user));

  await db.query(
    `
      INSERT INTO users (username, password, first_name, last_name, email)
      VALUES ($1, $2, $3, $4, $5),
            ($6, $7, $8, $9, $10)
    `,
    userValues
  );


  // Add some retrospectives
  await db.query(
    `
    INSERT INTO retrospectives (participant_name, facilitator, project_id, start_doing, continue_doing, stop_doing, action_items, lessons_learned)
    VALUES ('u1', 'u1', $1, 'Start doing for project 1', 'Continue doing for project 1', 'Stop doing for project 1', 'Action items for project 1', 'Lessons learned for project 1'),
           ('u2', 'u2', $2, 'Start doing for project 2', 'Continue doing for project 2', 'Stop doing for project 2', 'Action items for project 2', 'Lessons learned for project 2')
  `,
    testProjectIds
  );
}

/**
 * Begins a database transaction before each test case.
 */
async function commonBeforeEach() {
  await db.query("BEGIN");
}

/**
 * Rolls back the changes made in the database transaction after each test case.
 */
async function commonAfterEach() {
  await db.query("ROLLBACK");
}

/**
 * Ends the database connection after all test cases.
 */
async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testProjectIds,
};

