import { holidaysData } from "@/app/api/dashboard/data/holidays";

export interface Holiday {
    id: string;
    holiday_name: string;
    holiday_type: string;
    start_date: string;
    end_date: string;
    location: string[];
    createdAt: string;
    updatedAt: string;
    year:string;
}

interface HolidaysData {
    status: boolean; // Status of the API response
    message: string; // Message describing the API response
    data: {
        holidays: Holiday[]; // List of holidays
    };
}

async function fetchAllHolidays(
    year: string,
    setNationalHolidays: (holiday: Holiday[]) => void,
    setPublicHolidays: (holiday: Holiday[]) => void,
    setRestrictedHolidays: (holiday: Holiday[]) => void,
    setOfficeHolidays: (holiday: Holiday[]) => void,
    country?: string
): Promise<void> {
    try {
        const response: HolidaysData = holidaysData;

        // Apply country filter if a country is specified
        const filteredHolidays = country
            ? response.data.holidays.filter(holiday =>
                holiday.location.includes(country)
            )
            : response.data.holidays;

        // Filter holidays based on type and country (if provided)
        const nationalHolidays = filteredHolidays
            .filter(holiday => holiday.holiday_type === "National Holiday")
            .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

        const publicHolidays = filteredHolidays
            .filter(holiday => holiday.holiday_type === "Public Holiday")
            .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

        const restrictedHolidays = filteredHolidays
            .filter(holiday => holiday.holiday_type === "Restricted Holiday")
            .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

        const officeShutdowns = filteredHolidays
            .filter(holiday => holiday.holiday_type === "Office Shutdown")
            .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

        // Set the sorted arrays in respective state handlers
        setNationalHolidays(nationalHolidays);
        setPublicHolidays(publicHolidays);
        setRestrictedHolidays(restrictedHolidays);
        setOfficeHolidays(officeShutdowns);

        // Log the results
        console.log("National Holidays:", nationalHolidays);
        console.log("Public Holidays:", publicHolidays);
        console.log("Restricted Holidays:", restrictedHolidays);
        console.log("Office Shutdowns:", officeShutdowns);
    } catch (error) {
        console.error("Error fetching holidays:", error);
    }
}


export { fetchAllHolidays };
