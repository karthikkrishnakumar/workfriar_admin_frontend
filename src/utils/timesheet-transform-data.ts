// utils/transformData.ts
export interface TimesheetDay {
    date: string;
    hours: string;
    dayOfWeek: string;
  }
  
  export interface TimesheetData {
    days: TimesheetDay[];
    total: string;
  }
  

export const transformTimesheetData = (userId: string, timesheetData: any[]): TimesheetData | null => {
  const userTimesheet = timesheetData.find((user: any) => user.userId === userId);
  if (!userTimesheet) return null;

  const totalHours = userTimesheet.days
    .reduce((sum: number, day: any) => sum + parseFloat(day.hours.replace(":", ".")), 0)
    .toFixed(2);

  return {
    days: userTimesheet.days.map((day: any) => ({
      date: day.date,
      hours: day.hours,
      dayOfWeek: day.dayOfWeek,
    })),
    total: `${totalHours} hrs`,
  };
};
