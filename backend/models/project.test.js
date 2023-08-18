const { NotFoundError } = require("../expressError");
const db = require("../db.js");
const Project = require("./project.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testProjectIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** findAll */

describe("findAll", function () {
  test("works", async function () {
    const projects = await Project.findAll();
    
    expect(projects[0].deadline.toISOString().split('T')[0]).toEqual("2023-12-31");

    expect({
      id: projects[0].id,
      title: projects[0].title,
      description: projects[0].description,
      manager: projects[0].manager,
      status: projects[0].status,
    }).toEqual({
      id: testProjectIds[0],
      title: "Project Alpha",
      description: "Description for Project Alpha.",
      manager: "1",
      status: "planned",
    });
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    const project = await Project.get(testProjectIds[0]);
    expect(project.deadline.toISOString().split('T')[0]).toEqual("2023-12-31");
    expect({
      id: testProjectIds[0],
      title: "Project Alpha",
      description: "Description for Project Alpha.",
      manager: "1",
      status: "planned",
    });
  });

  test("not found if no such project", async function () {
    try {
      await Project.get(999); // Assuming no project with id 999 exists
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** create */

describe("create", function () {
  test("works", async function () {
    let projectData = {
      title: "Project Gamma",
      description: "Description for Project Gamma.",
      manager: 3,
      deadline: "2023-12-31",
      status: "completed",
    };

    let project = await Project.create(projectData);

    // Log the type and value of project.deadline
    console.log(typeof project.deadline, project.deadline);

    // Check for equality
    expect(project.deadline.toISOString().split('T')[0]).toEqual("2023-12-31");

    const result = await db.query(
      `SELECT id, title, description, manager, deadline, status
         FROM projects
         WHERE id = $1`, [project.id]
    );

    // Convert the deadline and manager from the query result before the assertion
    let receivedData = {
      ...result.rows[0],
      deadline: result.rows[0].deadline.toISOString().split('T')[0],
      manager: Number(result.rows[0].manager)
    };

    expect(receivedData).toEqual({
      id: project.id,
      ...projectData,
      manager: 3,
    });
  });
});

/************************************** update */

describe("update", function () {
  test("works", async function () {
    let newProjectData = {
      title: "Project Alpha Updated",
      status: "completed",
    };
    let project = await Project.update(testProjectIds[0], newProjectData);

    // Check the deadline date
    expect(project.deadline.toISOString().split('T')[0]).toEqual("2023-12-31");

    // Exclude deadline from the direct object comparison since we already checked it above
    expect({
      id: project.id,
      title: project.title,
      description: project.description,
      manager: parseInt(project.manager), // convert manager to a number
      status: project.status,
    }).toEqual({
      id: testProjectIds[0],
      ...newProjectData,
      manager: 1,
      description: "Description for Project Alpha.",
    });
  });

  test("not found if no such project", async function () {
    try {
      await Project.update(999, { title: "New Title" }); // Assuming no project with id 999 exists
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Project.remove(testProjectIds[0]);
    const res = await db.query("SELECT id FROM projects WHERE id=$1", [
      testProjectIds[0],
    ]);
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such project", async function () {
    try {
      await Project.remove(999); // Assuming no project with id 999 exists
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});


