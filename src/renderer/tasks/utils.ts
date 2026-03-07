import { differenceInDays } from "date-fns/differenceInDays";
import { differenceInMonths } from "date-fns/differenceInMonths";
import { addMonths } from "date-fns/addMonths";
import { subDays } from "date-fns/subDays";
import { getDay } from "date-fns/getDay";
import { eachDayOfInterval } from "date-fns/eachDayOfInterval";
import { startOfDay } from "date-fns/startOfDay";
import { addDays } from "date-fns/addDays";

export function isDateActiveForCycleItem(
  date: Date,
  daysOfWeekRepeat: number[]
) {
  const todayDayOfWeek = getDay(date);
  return daysOfWeekRepeat.includes(todayDayOfWeek);
}

export function getNextCycleItem<T>({
  startDate,
  daysOfWeekRepeat,
  items,
}: {
  startDate: Date;
  daysOfWeekRepeat: number[];
  items: T[];
}) {
  const today = new Date();
  const daysPast = differenceInDays(today, new Date(startDate.toUTCString()));

  if (!items.length || !daysOfWeekRepeat.length || daysPast < 0) {
    return { item: items[0], date: today };
  }

  const fullCycleDays = (items.length / daysOfWeekRepeat.length) * 7;
  const daysLeft = daysPast % fullCycleDays;

  if (daysLeft === 0) {
    return { item: items[0], date: today };
  }

  const dateOfLatestCycleBegin = subDays(today, daysLeft - 1);
  const days = eachDayOfInterval({
    start: dateOfLatestCycleBegin,
    end: today,
  });

  let currentItem = 0;
  let date: Date | undefined;
  for (const day of days) {
    if (isDateActiveForCycleItem(day, daysOfWeekRepeat)) {
      currentItem++;
      date = day;
    }
  }

  if (isDateActiveForCycleItem(today, daysOfWeekRepeat)) {
    return { item: items[currentItem], date: today };
  }

  date = today;
  while (!isDateActiveForCycleItem(date, daysOfWeekRepeat)) {
    date = addDays(date, 1);
  }
  return { item: items[(currentItem + 1) % items.length], date };
}

export function formatMonthsAndDays(fromDate: Date, toDate: Date = new Date()): string {
  const months = differenceInMonths(toDate, fromDate);
  if (months === 0) {
    const days = differenceInDays(toDate, fromDate);
    return `${days} ${days === 1 ? "day" : "days"}`;
  }
  const dateAfterMonths = addMonths(fromDate, months);
  const days = differenceInDays(toDate, dateAfterMonths);
  const monthsStr = `${months} ${months === 1 ? "month" : "months"}`;
  const daysStr = days > 0 ? ` ${days} ${days === 1 ? "day" : "days"}` : "";
  return monthsStr + daysStr;
}

export function calculateEstimatedEndDate({
  quantity,
  itemsPerUnit,
  daysOfWeekRepeat,
}: {
  quantity: number;
  itemsPerUnit?: number | null;
  daysOfWeekRepeat: number[];
}): Date | null {
  if (!quantity || !Number.isFinite(quantity)) return null;
  if (!daysOfWeekRepeat || daysOfWeekRepeat.length === 0) return null;

  const totalItems = quantity * (itemsPerUnit ?? 1);
  if (totalItems <= 0 || !Number.isFinite(totalItems)) return null;

  const activeDaysPerWeek = daysOfWeekRepeat.length;
  if (activeDaysPerWeek === 0) return null;

  const weeksOfSupply = totalItems / activeDaysPerWeek;
  const daysOfSupply = Math.ceil(weeksOfSupply * 7);

  const baseDate = startOfDay(new Date());
  return addDays(baseDate, daysOfSupply);
}

export function calculateRemainingSupply({
  quantity,
  itemsPerUnit,
  daysOfWeekRepeat,
  lastRefillDate,
}: {
  quantity: number;
  itemsPerUnit?: number | null;
  daysOfWeekRepeat: number[];
  lastRefillDate?: string | Date | null;
}): { unitsLeft: number; itemsLeft: number } | null {
  if (!quantity || !Number.isFinite(quantity)) return null;

  const perUnit = itemsPerUnit ?? 1;
  const totalItems = quantity * perUnit;
  if (totalItems <= 0 || !Number.isFinite(totalItems)) return null;

  if (!lastRefillDate) {
    return { unitsLeft: quantity, itemsLeft: totalItems };
  }

  if (!daysOfWeekRepeat || daysOfWeekRepeat.length === 0) {
    return { unitsLeft: quantity, itemsLeft: totalItems };
  }

  const startDate =
    typeof lastRefillDate === "string"
      ? startOfDay(new Date(lastRefillDate))
      : startOfDay(lastRefillDate);
  const today = startOfDay(new Date());

  if (today <= startDate) {
    return { unitsLeft: quantity, itemsLeft: totalItems };
  }

  const todayIsActive = isDateActiveForCycleItem(today, daysOfWeekRepeat);
  const endDate = todayIsActive ? subDays(today, 1) : today;

  if (endDate < startDate) {
    return { unitsLeft: quantity, itemsLeft: totalItems };
  }

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  let usedItems = 0;
  for (const day of days) {
    if (isDateActiveForCycleItem(day, daysOfWeekRepeat)) {
      usedItems++;
    }
  }

  const itemsLeft = Math.max(totalItems - usedItems, 0);
  const unitsLeft = itemsLeft / perUnit;

  return { unitsLeft, itemsLeft };
}
