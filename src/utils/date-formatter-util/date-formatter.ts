
// function to change to find the corresponding week day
export function dateStringToWeekDay(dateString:string):string {
    const date = new Date(dateString);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return daysOfWeek[date.getDay()];
}

// chnage date into Month date
export function dateStringToMonthDate(dateString:string):string {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' });
    return formatter.format(date);
}