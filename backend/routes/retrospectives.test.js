"use strict";

const request = require("supertest");
const app = require("../app");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testProjectIds,
  testRetrospectiveIds,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /retrospectives */

describe("POST /retrospectives", function () {
  test("ok for admin", async function () {
    const resp = await request(app)
        .post(`/retrospectives`)
        .send({
          participant_name: "Participant 1",
          facilitator: "Facilitator 1",
          project_id: testProjectIds[0], 
          start_doing: "Start coding regularly",
          continue_doing: "Continuous integration",
          stop_doing: "Late night commits",
          action_items: "Refactor old code",
          lessons_learned: "Unit testing is crucial"
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      retrospective: {
        id: expect.any(Number),
        participant_name: "Participant 1",
        facilitator: "Facilitator 1",
        project_id: testProjectIds[0], 
        start_doing: "Start coding regularly",
        continue_doing: "Continuous integration",
        stop_doing: "Late night commits",
        action_items: "Refactor old code",
        lessons_learned: "Unit testing is crucial",
        created_at: expect.any(String),
        updated_at: expect.any(String)
      },
    });
  });
});

/************************************** GET /retrospectives */

describe("GET /retrospectives", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get(`/retrospectives`);
    expect(resp.body).toHaveProperty("retrospectives");
    expect(resp.body.retrospectives).toBeInstanceOf(Array);
    resp.body.retrospectives.forEach(retrospective => {
      expect(retrospective).toHaveProperty("id");
      expect(retrospective).toHaveProperty("facilitator");
      expect(retrospective).toHaveProperty("start_doing");
      expect(retrospective).toHaveProperty("stop_doing");
    });
  });
});

/************************************** GET /retrospectives/:id */

describe("GET /retrospectives/:id", function () {
    test("works for anon", async function () {
      const resp = await request(app).get(`/retrospectives/${testRetrospectiveIds[0]}`);
      expect(resp.body).toEqual({
        retrospective: {
          id: testRetrospectiveIds[0],
          participant_name: "Participant 1",
          facilitator: "Facilitator 1",
          project_id: testProjectIds[0], 
          start_doing: "Start coding regularly",
          continue_doing: "Continuous integration",
          stop_doing: "Late night commits",
          action_items: "Refactor old code",
          lessons_learned: "Unit testing is crucial",
          created_at: expect.any(String),
          updated_at: expect.any(String)
        },
      });
    });
  });

/************************************** PATCH /retrospectives/:id */

describe("PATCH /retrospectives/:id", function () {
    test("works for admin", async function () {
      const resp = await request(app)
          .patch(`/retrospectives/${testRetrospectiveIds[0]}`)
          .send({
            start_doing: "New Action to Start Doing",
          })
          .set("authorization", `Bearer ${adminToken}`);
      expect(resp.body).toEqual({
        retrospective: {
          id: testRetrospectiveIds[0],
          participant_name: "Participant 1",
          facilitator: "Facilitator 1",
          project_id: testProjectIds[0], 
          start_doing: "New Action to Start Doing",
          continue_doing: "Continuous integration",
          stop_doing: "Late night commits",
          action_items: "Refactor old code",
          lessons_learned: "Unit testing is crucial",
          created_at: expect.any(String),
          updated_at: expect.any(String)
        },
      });
    });
  });

/************************************** DELETE /retrospectives/:id */

describe("DELETE /retrospectives/:id", function () {
  test("works for admin", async function () {
    const resp = await request(app)
        .delete(`/retrospectives/${testRetrospectiveIds[0]}`)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({ deleted: testRetrospectiveIds[0] });
  });
});
