"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testProjectIds,
  u1Token,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /projects */

describe("POST /projects", function () {
  test("ok for admin", async function () {
    const resp = await request(app)
        .post(`/projects`)
        .send({
          title: "test",
          description: "test project",
          manager: "John Doe",
          deadline: "2024-09-30T04:00:00.000Z",
          status: "in progress",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      project: {
        id: expect.any(Number),
        title: "test",
        description: "test project",
        manager: "John Doe",
        deadline: "2024-09-30T04:00:00.000Z",
        status: "in progress",
      },
    });
  });

  test("unauth for users", async function () {
    const resp = await request(app)
        .post(`/projects`)
        .send({
          title: "test",
          description: "test project",
          manager: "John Doe",
          deadline: "2023-07-20",
          status: "in progress",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post(`/projects`)
        .send({
          title: "test",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post(`/projects`)
        .send({
          title: "test",
          deadline: "not-a-valid-date",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /projects */

describe("GET /projects", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get(`/projects`);
    expect(resp.body).toHaveProperty("projects");
    expect(resp.body.projects).toBeInstanceOf(Array);
    resp.body.projects.forEach(project => {
      expect(project).toHaveProperty("id");
      expect(project).toHaveProperty("title");
      expect(project).toHaveProperty("description");
      expect(project).toHaveProperty("manager");
      expect(project).toHaveProperty("deadline");
      expect(project).toHaveProperty("status");
    });
  });

  test("Responds with a 404 if it cannot find the project in question", async function () {
    const resp = await request(app).get(`/projects/9999`);
    expect(resp.statusCode).toBe(404);
  });
});

/************************************** GET /projects/:id */

describe("GET /projects/:id", function () {
  test("works for anon", async function () {
    const resp = await request(app).get(`/projects/${testProjectIds[0]}`);
    expect(resp.body).toEqual({
      project: {
        id: testProjectIds[0],
        title: "Test Project 1",
        description: "Test Project 1 description",
        manager: "Manager1",
        deadline: "2024-09-30T04:00:00.000Z",
        status: "planned",
      },
    });
  });

  test("not found for no such project", async function () {
    const resp = await request(app).get(`/projects/0`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** PATCH /projects/:id */

describe("PATCH /projects/:id", function () {
  test("works for admin", async function () {
    const resp = await request(app)
        .patch(`/projects/${testProjectIds[0]}`)
        .send({
          title: "New Title",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
      project: {
        id: testProjectIds[0],
        title: "New Title",
        description: "Test Project 1 description",
        manager: "Manager1",
        deadline: "2024-09-30T04:00:00.000Z",
        status: "planned",
      },
    });
  });

  test("unauth for others", async function () {
    const resp = await request(app)
        .patch(`/projects/${testProjectIds[0]}`)
        .send({
          title: "New Title",
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .patch(`/projects/${testProjectIds[0]}`)
        .send({
          deadline: "not-a-valid-date",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** DELETE /projects/:id */

describe("DELETE /projects/:id", function () {
  test("works for admin", async function () {
    const resp = await request(app)
        .delete(`/projects/${testProjectIds[0]}`)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({ deleted: testProjectIds[0] });
  });

  test("unauth for others", async function () {
    const resp = await request(app)
        .delete(`/projects/${testProjectIds[0]}`)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .delete(`/projects/${testProjectIds[0]}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such project", async function () {
    const resp = await request(app)
        .delete(`/projects/0`)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });
});
