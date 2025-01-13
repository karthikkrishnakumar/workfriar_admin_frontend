import { TimeEntry, TimesheetDataTable, WeekDaysData } from "@/interfaces/timesheets/timesheets";

/**
 * Converts a time string (HH:mm) to the total number of minutes.
 * 
 * @param {string} time - The time string in the format HH:mm.
 * @returns {number} - The total number of minutes.
 */
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map((unit) => parseInt(unit, 10));
  return hours * 60 + minutes;
};

/**
 * Converts a total number of minutes to a time string (HH:mm).
 * 
 * @param {number} minutes - The total number of minutes.
 * @returns {string} - The time string in the format HH:mm.
 */
export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}:${remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes}`;
};

/**
 * Calculates the total hours for an array of time entries.
 * 
 * @param {TimeEntry[]} entries - An array of time entries, where each entry has a time string in the `hours` property.
 * @returns {string} - The total hours as a time string in the format HH:mm.
 */
export const calculateTotalHours = (entries: TimeEntry[]): string => {
  const totalMinutes = entries.reduce(
    (total, entry) => total + timeToMinutes(entry.hours || "00:00"),
    0
  );
  return minutesToTime(totalMinutes);
};

/**
 * Calculates the total hours for each day of the week from timesheet data.
 * 
 * @param {TimesheetDataTable[]} timesheetData - An array of timesheet data objects, where each object contains `data_sheet` with time entries.
 * @param {WeekDaysData[]} daysOfWeek - An array of days of the week, each with a `name` property.
 * @returns {Record<string, number>} - An object mapping each day's name to its total hours in minutes.
 */
export const calculateTotalByDay = (
  timesheetData: TimesheetDataTable[],
  daysOfWeek: WeekDaysData[]
): Record<string, number> => {
  const dailyTotals: Record<string, number> = {};
  daysOfWeek.forEach((day) => {
    dailyTotals[day.name] = timesheetData.reduce((total, timesheet) => {
      const dayIndex = daysOfWeek.indexOf(day);
      const dayEntry = timesheet.data_sheet[dayIndex];
      return total + timeToMinutes(dayEntry?.hours || "00:00");
    }, 0);
  });
  return dailyTotals;
};
