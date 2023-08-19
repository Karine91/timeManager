import { getHours, getMinutes, getSeconds } from "./utils";

test("should get right hours value", () => {
  const time = 9020; // 2h 30m 20sec
  const hours = getHours(time);
  const minutes = getMinutes(time);
  const seconds = getSeconds(time);

  expect(hours).toBe(2);
  expect(minutes).toBe(30);
  expect(seconds).toBe(20);
});

test("should get right hours value", () => {
  const time = 7201; // 2h 00 01
  const hours = getHours(time);
  const minutes = getMinutes(time);
  const seconds = getSeconds(time);

  expect(hours).toBe(2);
  expect(minutes).toBe(0);
  expect(seconds).toBe(1);
});
