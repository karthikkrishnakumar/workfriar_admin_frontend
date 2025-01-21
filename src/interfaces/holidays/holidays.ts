export interface Holiday {
    id: string;
    holiday_name: string;
    start_date: string;
    end_date: string;
    holiday_date: string;
    location: string[];
    createdAt: string;
    updatedAt: string;
    year: string;
}


interface HolidayType {
    holiday_type: string;
    holidays: Holiday[];
}


export interface HolidaysResponse {
    status: boolean;
    message: string;
    data: {
        holidays: HolidayType[];
    };
}

export interface AddHolidaysResponse {
    status: boolean;
    message: string;
}