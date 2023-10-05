"use strict";

/** Routes for retrospectives. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Retrospective = require("../models/retrospective");
const retrospectiveNewSchema = require("../schemas/retrospectiveNew.json");
const retrospectiveUpdateSchema = require("../schemas/retrospectiveUpdate.json");
const retrospectiveSearchSchema = require("../schemas/retrospectiveSearch.json");

const router = express.Router({ mergeParams: true });

/** POST / { retrospective } => { retrospective }
 *
 * retrospective should be { participant_name, feedback, facilitator, retrospective_date, action_items }
 *
 * Returns { id, participant_name, feedback, facilitator, retrospective_date, action_items }
 *
 * Authorization required: admin
 */

router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, retrospectiveNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const retrospective = await Retrospective.create(req.body);
    return res.status(201).json({ retrospective });
  } catch (err) {
    return next(err);
  }
});

/** GET / =>
 *   { retrospectives: [ { id, participant_name, feedback, facilitator, retrospective_date, action_items }, ...] }
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  const q = req.query;
  try {
    const validator = jsonschema.validate(q, retrospectiveSearchSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const retrospectives = await Retrospective.findAll(q);
    return res.json({ retrospectives });
  } catch (err) {
    return next(err);
  }
});

/** GET /[retrospectiveId] => { retrospective }
 *
 * Returns { id, participant_name, feedback, facilitator, retrospective_date, action_items }
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  try {
    const retrospective = await Retrospective.get(req.params.id);
    return res.json({ retrospective });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[retrospectiveId]  { fld1, fld2, ... } => { retrospective }
 *
 * Data can include: { participant_name, feedback, facilitator, retrospective_date, action_items }
 *
 * Returns { id, participant_name, feedback, facilitator, retrospective_date, action_items }
 *
 * Authorization required: admin
 */

router.patch("/:id", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, retrospectiveUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const retrospective = await Retrospective.update(req.params.id, req.body);
    return res.json({ retrospective });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[retrospectiveId]  =>  { deleted: id }
 *
 * Authorization required: admin
 */

router.delete("/:id", ensureAdmin, async function (req, res, next) {
  try {
    await Retrospective.remove(req.params.id);
    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});

/** GET /by-project/:projectId
 *
 * Returns all retrospectives related to a specific project:
 * [
 *   { 
 *     id, facilitator, start_doing, stop_doing, continue_doing, 
 *     action_items, lessons_learned, participant_name, created_at, updated_at
 *   },
 *   ...
 * ]
 *
 * Authorization required: none 
 */
router.get("/by-project/:projectId", async function (req, res, next) {
  try {
    const retrospectives = await Retrospective.findByProject(req.params.projectId);
    return res.json(retrospectives);
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
