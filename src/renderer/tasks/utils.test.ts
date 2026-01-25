import { getNextCycleItem } from "./utils";

describe("cycle items", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("should get active cycle item", () => {
    jest.setSystemTime(new Date(Date.UTC(2026, 1, 20)).getTime());

    const result = getNextCycleItem({
      startDate: new Date(Date.UTC(2026, 1, 6)),
      daysOfWeekRepeat: [2, 4, 6],
      items: ["test 1", "test 2", "test 3", "test 4", "test 5", "test 6"],
    });

    expect(result.item).toBe("test 1");
  });

  test("should get active cycle item 2", () => {
    jest.setSystemTime(new Date(Date.UTC(2026, 1, 23)).getTime());

    const result = getNextCycleItem({
      startDate: new Date(Date.UTC(2026, 1, 6)),
      daysOfWeekRepeat: [2, 4, 6],
      items: ["test 1", "test 2", "test 3", "test 4", "test 5", "test 6"],
    });

    expect(result.item).toBe("test 3");
  });

  test("should get active cycle item 3", () => {
    jest.setSystemTime(new Date(Date.UTC(2026, 1, 1)));

    const result = getNextCycleItem({
      startDate: new Date(Date.UTC(2026, 0, 6)),
      daysOfWeekRepeat: [2, 4, 6],
      items: ["test 1", "test 2", "test 3", "test 4", "test 5", "test 6"],
    });
    console.log(result.date);
    expect(result.item).toBe("test 1");
  });
});
