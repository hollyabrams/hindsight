"use strict";

/** Routes for projects. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Project = require("../models/project");
const projectNewSchema = require("../schemas/projectNew.json");
const projectUpdateSchema = require("../schemas/projectUpdate.json");
const projectSearchSchema = require("../schemas/projectSearch.json");

const router = express.Router({ mergeParams: true });


/** POST / { project } => { project }
 *
 * project should be { title, description, manager, deadline, status }
 *
 * Returns { id, title, description, manager, deadline, status }
 *
 * Authorization required: admin
 */


router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, projectNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const project = await Project.create(req.body);
    return res.status(201).json({ project });
  } catch (err) {
    return next(err);
  }
});

/** GET / =>
 *   { projects: [ { id, name, description, start date }, ...] }
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  const q = req.query;
  console.log('Received search term:', q);
  try {
    const validator = jsonschema.validate(q, projectSearchSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const projects = await Project.findAll(q);
    return res.json({ projects });
  } catch (err) {
    return next(err);
  }
});

/** GET /[projectId] => { project }
 *
 * Returns { id, name, description, start date }
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  try {
    const project = await Project.get(req.params.id);
    return res.json({ project });
  } catch (err) {
    return next(err);
  }
});


/** PATCH /[projectId]  { fld1, fld2, ... } => { project }
 *
 * Data can include: { name, description, start date }
 *
 * Returns { id, name, description, start date }
 *
 * Authorization required: admin
 */

router.patch("/:id", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, projectUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const project = await Project.update(req.params.id, req.body);
    return res.json({ project });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[productId]  =>  { deleted: id }
 *
 * Authorization required: admin
 */

router.delete("/:id", ensureAdmin, async function (req, res, next) {
  try {
    await Project.remove(req.params.id);
    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;