import { NextResponse } from "next/server";
import { dataForUser1, dataForUser2 } from "../data/data-sets"; // Your data sources
import { convertToWeekData } from "@/utils/datepicker-util/datepicker-formater-routes";  // Adjust the path as needed

 
// Week Data: You can import or define the week data structure as needed
const weekData = [
    // Additional Weeks for 2024
   
    { month: "January", week: 0, start: "01/01/2024", end: "01/06/2024" },
    { month: "January", week: 1, start: "01/07/2024", end: "01/13/2024" },
    { month: "January", week: 2, start: "01/14/2024", end: "01/20/2024" },
    { month: "January", week: 3, start: "01/21/2024", end: "01/27/2024" },
    { month: "January", week: 4, start: "01/28/2024", end: "01/31/2024" },

    { month: "February", week: 5, start: "02/01/2024", end: "02/03/2024" },
    { month: "February", week: 6, start: "02/04/2024", end: "02/10/2024" },
    { month: "February", week: 7, start: "02/11/2024", end: "02/17/2024" },
    { month: "February", week: 8, start: "02/18/2024", end: "02/24/2024" },
    { month: "February", week: 9, start: "02/25/2024", end: "02/29/2024" },

    { month: "March", week: 10, start: "03/01/2024", end: "03/02/2024" },
    { month: "March", week: 11, start: "03/03/2024", end: "03/09/2024" },
    { month: "March", week: 12, start: "03/10/2024", end: "03/16/2024" },
    { month: "March", week: 13, start: "03/17/2024", end: "03/23/2024" },
    { month: "March", week: 14, start: "03/24/2024", end: "03/30/2024" },
    { month: "March", week: 15, start: "03/31/2024", end: "03/31/2024" },

    { month: "April", week: 16, start: "04/01/2024", end: "04/06/2024" },
    { month: "April", week: 17, start: "04/07/2024", end: "04/13/2024" },
    { month: "April", week: 18, start: "04/14/2024", end: "04/20/2024" },
    { month: "April", week: 19, start: "04/21/2024", end: "04/27/2024" },
    { month: "April", week: 20, start: "04/28/2024", end: "04/30/2024" },

    { month: "May", week: 21, start: "05/01/2024", end: "05/04/2024" },
    { month: "May", week: 22, start: "05/05/2024", end: "05/11/2024" },
    { month: "May", week: 23, start: "05/12/2024", end: "05/18/2024" },
    { month: "May", week: 24, start: "05/19/2024", end: "05/25/2024" },
    { month: "May", week: 25, start: "05/26/2024", end: "05/31/2024" },

    { month: "June", week: 26, start: "06/01/2024", end: "06/01/2024" },
    { month: "June", week: 27, start: "06/02/2024", end: "06/08/2024" },
    { month: "June", week: 28, start: "06/09/2024", end: "06/15/2024" },
    { month: "June", week: 29, start: "06/16/2024", end: "06/22/2024" },
    { month: "June", week: 30, start: "06/23/2024", end: "06/29/2024" },
    { month: "June", week: 31, start: "06/30/2024", end: "06/30/2024" },

    { month: "July", week: 32, start: "07/01/2024", end: "07/06/2024" },
    { month: "July", week: 33, start: "07/07/2024", end: "07/13/2024" },
    { month: "July", week: 34, start: "07/14/2024", end: "07/20/2024" },
    { month: "July", week: 35, start: "07/21/2024", end: "07/27/2024" },
    { month: "July", week: 36, start: "07/28/2024", end: "07/31/2024" },

    { month: "August", week: 37, start: "08/01/2024", end: "08/03/2024" },
    { month: "August", week: 38, start: "08/04/2024", end: "08/10/2024" },
    { month: "August", week: 39, start: "08/11/2024", end: "08/17/2024" },
    { month: "August", week: 40, start: "08/18/2024", end: "08/24/2024" },
    { month: "August", week: 41, start: "08/25/2024", end: "08/31/2024" },

    { month: "September", week: 42, start: "09/01/2024", end: "09/07/2024" },
    { month: "September", week: 43, start: "09/08/2024", end: "09/14/2024" },
    { month: "September", week: 44, start: "09/15/2024", end: "09/21/2024" },
    { month: "September", week: 45, start: "09/22/2024", end: "09/28/2024" },
    { month: "September", week: 46, start: "09/29/2024", end: "09/30/2024" },

    { month: "October", week: 47, start: "10/01/2024", end: "10/05/2024" },
    { month: "October", week: 48, start: "10/06/2024", end: "10/12/2024" },
    { month: "October", week: 49, start: "10/13/2024", end: "10/19/2024" },
    { month: "October", week: 50, start: "10/20/2024", end: "10/26/2024" },
    { month: "October", week: 51, start: "10/27/2024", end: "10/31/2024" },

    { month: "November", week: 52, start: "11/01/2024", end: "11/02/2024" },
    { month: "November", week: 53, start: "11/03/2024", end: "11/09/2024" },
    { month: "November", week: 54, start: "11/10/2024", end: "11/16/2024" },
    { month: "November", week: 55, start: "11/17/2024", end: "11/23/2024" },
    { month: "November", week: 56, start: "11/24/2024", end: "11/30/2024" },

    { month: "December", week: 57, start: "12/01/2024", end: "12/07/2024" },
    { month: "December", week: 58, start: "12/08/2024", end: "12/14/2024" },
    { month: "December", week: 59, start: "12/15/2024", end: "12/21/2024" },
    { month: "December", week: 60, start: "12/22/2024", end: "12/28/2024" },
    { month: "December", week: 61, start: "12/29/2024", end: "12/31/2024" },
  ];


export async function GET() {
  // Generate week data for User 1 and User 2 based on the timesheet data and week data
  const weekDueDataUser1 = convertToWeekData(dataForUser1.timesheetData.days, weekData);
  const weekDueDataUser2 = convertToWeekData(dataForUser2.timesheetData.days, weekData);

  return NextResponse.json({
    DatePickerData: weekDueDataUser1,
    DatePickerDataUser2: weekDueDataUser2,
  });
}
