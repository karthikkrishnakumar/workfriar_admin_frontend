// date-formater.ts

import { DatePickerData } from "@/interfaces/dashboard/dashboard";


// Format date (e.g., "Jan 1")
export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

// Format year (e.g., "2024")
export const formatYear = (date: string) => new Date(date).getFullYear();

// Calculates start and end dates for a given week
export const getWeekDates = (weekData: DatePickerData[] | null | undefined, weekIndex: number | null) => {
  if (!weekData || !Array.isArray(weekData) || weekIndex === null) return null;

  const selectedWeek = weekData[weekIndex];
  const startDate = selectedWeek?.startDate;
  const endDate = selectedWeek?.endDate;
  return { startDate, endDate };
};

// Finds the current week based on today's date
export const findCurrentWeek = (weekData: DatePickerData[] | null | undefined): number | null  => {

  if (!weekData || !Array.isArray(weekData)) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const week of weekData) {
    const start = new Date(week.startDate);
    const end = new Date(week.endDate);
    start.setHours(0, 0, 0, 0); // Ignore time in start date
    end.setHours(23, 59, 59, 999); // Include the entire day in the end date
    if (today >= start && today <= end) {
      return week.week;
    }
  }
  return weekData[weekData.length - 1]?.week ?? null; // Default to the first week if no match is found
};

// Determines which weeks should be disabled based on today's date
export const getDisabledWeeks = (
  weekData: DatePickerData[] | null | undefined,
  type?: "all" | "pastDue"
): boolean[] | null => {

  if (!weekData || !Array.isArray(weekData)) return null;

  const today = new Date();
  const limitDate = new Date(today.getMonth() + 1);

  // Map the input data to the disabled weeks array
  const disabledWeeks = weekData.map((week) => {
    const weekStart = new Date(week.startDate);
    if (type === "pastDue") {
      return weekStart > today; // Disable weeks starting after today for pastDue
    } else {
      return weekStart < limitDate; // Disable weeks starting after limitDate for others
    }
  });

  // Check if all entries are false
  if (disabledWeeks.every((disable) => !disable)) {
    disabledWeeks.push(true); // Add a true if all are false
  }
  return disabledWeeks;
};

export const getFutureWeeks = (
  weekData: DatePickerData[] | null | undefined
): boolean[] | null => {

  if (!weekData || !Array.isArray(weekData)) return null;

  const oneMonthAdvance = new Date();
  oneMonthAdvance.setMonth(oneMonthAdvance.getMonth() + 1);

  // Map the input data to the disabled weeks array
  const futureWeeks = weekData.map((week) => {
    const weekStart = new Date(week.startDate);
    const disable = weekStart > oneMonthAdvance; // Disable weeks starting after today
    return disable;
  });
  // Check if all entries are false
  if (futureWeeks.every((disable) => !disable)) {
    futureWeeks.push(true); // Add a `true` if all are false
  }
  return futureWeeks;
};
