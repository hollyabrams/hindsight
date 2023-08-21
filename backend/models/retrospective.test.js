const { NotFoundError } = require("../expressError");
const db = require("../db.js");
const Retrospective = require("./retrospective.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testProjectIds,
  testRetrospectiveIds, 
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** findAll */

test("findAll › works", async function () {
    const retrospectives = await Retrospective.findAll();
    expect(retrospectives[0]).toEqual({
      id: testRetrospectiveIds[0],
      facilitator: expect.any(String),
      start_doing: expect.any(String),
      stop_doing: expect.any(String),
      continue_doing: expect.any(String),
      action_items: expect.any(String),
      lessons_learned: expect.any(String),
      participant_name: expect.any(String),
      project_id: expect.any(Number),
      created_at: expect.any(Date),
      updated_at: expect.any(Date)
    });
  });

/************************************** get */

test("get › works", async function () {
    const retrospective = await Retrospective.get(testRetrospectiveIds[0]);
    expect(retrospective).toEqual({
      id: testRetrospectiveIds[0],
      facilitator: expect.any(String),
      start_doing: expect.any(String),
      stop_doing: expect.any(String),
      continue_doing: expect.any(String),
      action_items: expect.any(String),
      lessons_learned: expect.any(String),
      participant_name: expect.any(String),
      project_id: expect.any(Number),
      created_at: expect.any(Date),
      updated_at: expect.any(Date)
    });
  });

  test("not found if no such retrospective", async function () {
    try {
      await Retrospective.get(999); 
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

/************************************** create */

describe("create", function () {
    test("works", async function () {
      const newRetrospective = {
        facilitator: "u1",
        start_doing: "New Start Doing",
        stop_doing: "New Stop Doing",
        continue_doing: "New Continue Doing",
        action_items: "New Action Items",
        lessons_learned: "New Lessons Learned",
        participant_name: "u1",
        project_id: testProjectIds[0],  // Ensure this is a valid project ID
      };
  
      const retrospective = await Retrospective.create(newRetrospective);
      expect(retrospective).toEqual({
        ...newRetrospective,
        id: expect.any(Number),
        created_at: expect.any(Date),
        updated_at: expect.any(Date)
      });
    });
  });
  
/************************************** update */

describe("update", function () {
    test("works", async function () {
      let updatedRetrospectiveData = {
        facilitator: "u1",
      };
  
      let retrospective = await Retrospective.update(testRetrospectiveIds[0], updatedRetrospectiveData);
  
      expect(retrospective).toEqual({
        id: testRetrospectiveIds[0],
        participant_name: 'u1',
        facilitator: 'u1', // This should reflect the updated value.
        project_id: testProjectIds[0],
        start_doing: 'Start doing for project 1',
        continue_doing: 'Continue doing for project 1',
        stop_doing: 'Stop doing for project 1',
        action_items: 'Action items for project 1',
        lessons_learned: 'Lessons learned for project 1',
        created_at: expect.any(Date),
        updated_at: expect.any(Date)
      });
    });
  
    test("not found if no such retrospective", async function () {
      try {
        await Retrospective.update(999, { facilitator: "New Facilitator" });
        fail();
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy();
      }
    });
  });  

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Retrospective.remove(testRetrospectiveIds[0]);
    const res = await db.query("SELECT id FROM retrospectives WHERE id=$1", [testRetrospectiveIds[0]]);
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such retrospective", async function () {
    try {
      await Retrospective.remove(999);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
