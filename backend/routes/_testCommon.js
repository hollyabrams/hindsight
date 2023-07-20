"use strict";

const db = require("../db.js");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const Project = require("../models/project.js");

const testProjectIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM projects");

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
    u1Token,
    u2Token,
    u3Token,
    adminToken,
  };