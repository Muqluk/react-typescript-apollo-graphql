import format from 'date-fns/format';
import { addDays } from 'date-fns';

export function padLeadingZero(value: string | number) {
  return value > 9 ? value : `0${value}`;
}

export function getFormattedDateTime(date: Date = new Date(), strFormat: string) {
  const f = strFormat || 'MM-dd-YYYY:h/mm/ss a';
  const sDate = Date.parse(date.toString());
  // return format(sDate, f, { awareOfUnicodeTokens: true });
  return format(sDate, f);
}

export function getFormattedDate(date: Date = new Date(), strFormat?: string) {
  const f = strFormat || 'MM-dd-YYYY';
  if (date !== null) {
    // return format(date, f, { awareOfUnicodeTokens: true });
    return format(date, f);
  }
  return '';
}

export function getLastXYears(date: Date = new Date(), numberOfYears = 0) {
  let current = date;
  let counter = 0;
  let index = 0;
  const range2 = [];

  while (index <= numberOfYears) {
    range2.unshift(current.getFullYear());
    current = new Date((current.getFullYear() + 1), current.getMonth(), current.getDate());

    index += 1;

    // Fail safe just in case we get stuck in a infinite loop
    counter += 1;
    if (counter > 100) {
      break;
    }
  }

  return range2;
}

export function getYearsBetween(startDate: Date = new Date(), endDate: Date = new Date()) {
  let current = startDate;
  let counter = 0;
  const range2 = [];
  while (current <= endDate) {
    range2.unshift(current.getFullYear());
    current = new Date((current.getFullYear() + 1), current.getMonth(), current.getDate());

    // Fail safe just in case we get stuck in a infinite loop
    counter += 1;
    if (counter > 100) {
      break;
    }
  }

  return range2;
}

export function lastNDays(nDays: number) {
  return addDays(new Date(), nDays * -1);
}
