import { differenceInDays } from "date-fns/differenceInDays";
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
  const fullCycleDays = (items.length / daysOfWeekRepeat.length) * 7;
  const daysLeft = daysPast % fullCycleDays;

  console.log({ today, daysPast, fullCycleDays, daysLeft });

  if (daysLeft == 0) return { item: items[0], date: today };

  const dateOfLatestCycleBegin = subDays(today, daysLeft - 1);
  const days = eachDayOfInterval({
    start: dateOfLatestCycleBegin,
    end: today,
  });

  console.log(days);

  let currentItem = 0;
  let date;
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
  console.log({ items, currentItem });
  return { item: items[(currentItem + 1) % items.length], date };
}
