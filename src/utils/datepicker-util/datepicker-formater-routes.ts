// date-formater.ts

// Formats a date to "MMM dd" format
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

// Extracts and formats the year from a date
export const formatYear = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
  });
};

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
  for (const week of weekData) {
    const start = new Date(week.start);
    const end = new Date(week.end);

    if (today >= start && today <= end) {
      return week.week;
    }
  }
  return weekData[0].week; // Default to the first week if no match is found
};

// Determines which weeks should be disabled based on today's date
export const getDisabledWeeks = (
  weekData: { start: string; end: string }[]
): boolean[] => {
  const today = new Date();
  return weekData.map((week) => {
    const weekStart = new Date(week.start);
    const disable =  weekStart > today; // Disable weeks starting after today
    return disable
  });
};
