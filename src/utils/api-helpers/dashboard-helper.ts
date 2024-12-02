// Helper function to format total hours as hh:mm
export function formatTime(totalHours: number): string {
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

// Helper function to get a date string in "DD/MM/YYYY" format
export function formatDate(date: Date): string {
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
}

// Helper function to get the start of the week (Sunday) for a given date
export function getStartOfWeek(date: Date): Date {
  const day = date.getDay();
  const diff = date.getDate() - day;
  return new Date(date.setDate(diff));
}

// Helper function to get all dates from Sunday to Saturday of a week
export function getFullWeek(
  startDate: Date
): { dayOfWeek: string; date: string }[] {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
  const weekDates = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < 7; i++) {
    weekDates.push({
      dayOfWeek: daysOfWeek[currentDate.getDay()],
      date: formatDate(currentDate),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekDates;
}
