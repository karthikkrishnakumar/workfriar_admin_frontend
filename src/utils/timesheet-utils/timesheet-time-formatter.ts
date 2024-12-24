import { TimeEntry, TimesheetDataTable, WeekDaysData } from "@/interfaces/timesheets/timesheets";


export const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map((unit) => parseInt(unit, 10));
    return hours * 60 + minutes;
  };
  
  export const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}:${remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes}`;
  };
  
  export const calculateTotalHours = (entries: TimeEntry[]): string => {
    const totalMinutes = entries.reduce(
      (total, entry) => total + timeToMinutes(entry.hours || "00:00"),
      0
    );
    return minutesToTime(totalMinutes);
  };
  
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
  