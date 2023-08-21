"use strict";

const db = require("../db.js");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const Project = require("../models/project.js");
const Retrospective = require("../models/retrospective.js");

const testProjectIds = [];
const testRetrospectiveIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM projects");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM retrospectives");


  testProjectIds[0] = (await Project.create({
    title: "Test Project 1",
    description: "Test Project 1 description",
    manager: "Manager1",
    deadline: "2024-09-30T04:00:00.000Z",
    status: "planned"
  })).id;

  testProjectIds[1] = (await Project.create({
    title: "Test Project 2",
    description: "Test Project 2 description",
    manager: "Manager2",
    deadline: "2024-09-30T04:00:00.000Z",
    status: "in progress"
  })).id;

  testProjectIds[2] = (await Project.create({
    title: "Test Project 3",
    description: "Test Project 3 description",
    manager: "Manager3",
    deadline: "2024-09-30T04:00:00.000Z",
    status: "completed"
  })).id;

  testRetrospectiveIds[0] = (await Retrospective.create({
    participant_name: "Participant 1",
    facilitator: "Facilitator 1",
    project_id: testProjectIds[0], 
    start_doing: "Start coding regularly",
    continue_doing: "Continuous integration",
    stop_doing: "Late night commits",
    action_items: "Refactor old code",
    lessons_learned: "Unit testing is crucial"
  })).id;

  testRetrospectiveIds[1] = (await Retrospective.create({
    participant_name: "Participant 2",
    facilitator: "Facilitator 2",
    project_id: testProjectIds[1],
    start_doing: "Pair programming sessions",
    continue_doing: "Morning stand-ups",
    stop_doing: "Skipping code reviews",
    action_items: "Adopt TDD",
    lessons_learned: "Code reviews improve code quality"
  })).id;

  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    isAdmin: false,
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
    isAdmin: false,
  });
  await User.register({
    username: "admin",
    firstName: "Admin",
    lastName: "Admin",
    email: "admin@user.com",
    password: "admin",
    isAdmin: true,
  });
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const u3Token = createToken({ username: "u3", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testProjectIds,
    testRetrospectiveIds,
    u1Token,
    u2Token,
    u3Token,
    adminToken,
  };