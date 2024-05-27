const db = require("../db");

const { NotFoundError, BadRequestError } = require("../expressError");
const {
  commonBeforeAll,
  commonAfterAll,
  commonBeforeEach,
  commonAfterEach,
  groupIds,
} = require("./_testCommon");
const Group = require("./group");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("find All Groups", () => {
  test("should get all groups", async () => {
    const groups = await Group.getAll();
    expect(groups).toEqual([
      {
        groupId: groupIds[0],
        groupName: "K-2 Boys",
      },
      {
        groupId: groupIds[1],
        groupName: "K-2 Girls",
      },
    ]);
  });
});

describe("get group by id", () => {
  test("should get by id", async () => {
    const group = await Group.getGroup(groupIds[0]);
    expect(group).toEqual({
      groupId: groupIds[0],
      groupName: "K-2 Boys",
    });
  });

  test("should get Not Found Error", async () => {
    try {
      await Group.getGroup(groupIds[0] + 10);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe("should create newGroup", () => {
  test("should create new group", async () => {
    const group = await Group.create("3-5 Girls");
    expect(group).toEqual({
      groupId: expect.any(Number),
      groupName: "3-5 Girls",
    });
  });
  test("should get badrequest error if already exist", async () => {
    try {
      await Group.create("K-2 Girls");
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

describe("update Group", () => {
  test("should update groupName", async () => {
    const group = await Group.update(groupIds[0], "3-5 Boys");
    expect(group).toEqual({
      groupId: groupIds[0],
      groupName: "3-5 Boys",
    });
    await Group.update(groupIds[0], "K-2 Boys");
  });
  test("should return not found", async () => {
    try {
      await Group.update(groupIds[0] + 10, "3-5 Boys");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("should return Bad Request", async () => {
    try {
      await Group.update(groupIds[0], "K-2 Girls");
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

describe("remove Group", () => {
  test("should remove Group", async () => {
    const removedId = await Group.remove(groupIds[1]);
    expect(removedId.group_id).toBe(groupIds[1]);
  });

  test("should get Not Found Error", async () => {
    try {
      await Group.remove(groupIds[0] + 10);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
