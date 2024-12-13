// date-formater.ts

 // Format date (e.g., "Jan 1")
 export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

// Format year (e.g., "2024")
export const formatYear = (date: string) => new Date(date).getFullYear();

// Calculates start and end dates for a given week
export const getWeekDates = (
  weekData: { start: string; end: string; week: number }[],
  weekIndex: number
) => {
  const selectedWeek = weekData[weekIndex];
  const startDate = new Date(selectedWeek?.start);
  const endDate = new Date(selectedWeek?.end);
  return { startDate, endDate };
};

// Finds the current week based on today's date
export const findCurrentWeek = (
  weekData: { start: string; end: string; week: number }[]
): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (const week of weekData) {
    const start = new Date(week.start);
    const end = new Date(week.end);
    start.setHours(0, 0, 0, 0); // Ignore time in start date
    end.setHours(23, 59, 59, 999); // Include the entire day in the end date

    if (today >= start && today <= end) {
      return week.week;
    }
  }

  return weekData[weekData.length-1].week; // Default to the first week if no match is found
};

// Determines which weeks should be disabled based on today's date

export const getDisabledWeeks = (
  weekData: { start: string; end: string }[]
): boolean[] => {
  const today = new Date();
  
  // Map the input data to the disabled weeks array
  const disabledWeeks = weekData.map((week) => {
    const weekStart = new Date(week.start);
    const disable = weekStart > today; // Disable weeks starting after today
    return disable;
  });

  // Check if all entries are false
  if (disabledWeeks.every((disable) => !disable)) {
    disabledWeeks.push(true); // Add a `true` if all are false
  }

  return disabledWeeks;
};

export const getFutureWeeks = (
  weekData: { start: string; end: string }[]
): boolean[] => {
  const oneMonthAdvance = new Date();
  oneMonthAdvance.setMonth(oneMonthAdvance.getMonth() + 1);
  
  // Map the input data to the disabled weeks array
  const futureWeeks = weekData.map((week) => {
    const weekStart = new Date(week.start);
    const disable = weekStart > oneMonthAdvance; // Disable weeks starting after today
    return disable;
  });

  // Check if all entries are false
  if (futureWeeks.every((disable) => !disable)) {
    futureWeeks.push(true); // Add a `true` if all are false
  }

  return futureWeeks;
};

//in dashboard due dates getting
export interface TimesheetDay {
  dayOfWeek: string;
  date: string;
  hours: string;
  disable: boolean;
}

export interface WeekDueData {
  month: string;
  week: number;
  start: string;
  end: string;
  days?: TimesheetDay[]; // Optional, only included if there are matching timesheet days
}

export const convertToWeekData = (
  timesheetDays: TimesheetDay[],
  weekData: any
): WeekDueData[] => {
  const weekDueData: WeekDueData[] = [];
  let weekIndex = 0; // Variable to track the current week index

  // Iterate through each week in the weekData
  weekData.forEach((week: any) => {
    const weekStartDate = new Date(week.start);
    const weekEndDate = new Date(week.end);

    // Filter the timesheetDays that fall within the current week
    const weekDays = timesheetDays.filter((day) => {
      const dayDate = new Date(day.date);
      return dayDate >= weekStartDate && dayDate <= weekEndDate;
    });

    // If there are matching days for the week, include the days; otherwise, omit the days field
    if (weekDays.length > 0) {
      weekDueData.push({
        month: week.month,
        week: weekIndex, // Set week to the current index, starting from 0
        start: week.start,
        end: week.end,
        days: weekDays, // Only include 'days' if there are matching days
      });

      // Increment the week index after each valid week
      weekIndex++;
    }
  });

  return weekDueData;
};
