
// function to change to find the corresponding week day
export function dateStringToWeekDay(dateString: string): string {
    const date = new Date(dateString);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return daysOfWeek[date.getDay()];
}

// chnage date into Month date
export function dateStringToMonthDate(dateString: string): string {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' });
    return formatter.format(date);
}

// en-gb formatter
export function enGBFormattter(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
}

// YYYY-MM-DD formatter
export function toISODateFormatter(dateString: string): string {
    const [day, month, year] = dateString.split("/").map(Number);
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export const normalizedDateString = (dateString: string):string => {
    // Split the input string by hyphen
    const parts = dateString.split("-");
    
    // Ensure the day and month have leading zeros
    const year = parts[0]; // Year remains unchanged
    const month = parts[1].padStart(2, "0"); // Ensure two digits for month
    const day = parts[2].padStart(2, "0"); // Ensure two digits for day

    return `${year}-${month}-${day}`;
}


export function getWeekdayFromDate(dateString: string) {
    const dateParts = dateString.split("/");
    const month = parseInt(dateParts[0], 10) - 1;
    const day = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    const date = new Date(year, month, day);
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekday = weekdays[date.getDay()];

    return weekday;
}

export function isoTOenGB(dateString:string) {
    const date = dateString.split('T')[0];
    return date.replaceAll('-','/')
}

/**
 * Function to format a date into "Today," "Yesterday," or "Aug 1, 2024."
 * @param dateString - The input date in "YYYY-MM-DD" format
 * @returns The formatted date string
 */
export function formatDateforNotifications(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  const formatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
  return formatter.format(date);
}

/**
 * Converts a time string in the format "13:08:57.224" to "12:30 PM".
 * @param timeString - The time string to convert (e.g., "13:08:57.224").
 * @returns The formatted time string in "12:30 PM" format.
 */
export function formatTimeTo12Hour(timeString: string): string {
  // Split the time string to extract hours and minutes
  const [hours, minutes] = timeString.split(':').map(Number);

  // Create a Date object
  const date = new Date();
  date.setHours(hours, minutes);

  // Format the time to 12-hour format with AM/PM
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return formatter.format(date);
}
