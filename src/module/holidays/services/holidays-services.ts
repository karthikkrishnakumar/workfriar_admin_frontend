import { holidaysData } from "@/app/api/dashboard/data/holidays";
import { HolidaysResponse } from "@/interfaces/holidays/holidays";
import http from "@/utils/http";




export default function UseHolidayServices() {

    const fetchAllHolidays = async (year: number): Promise<HolidaysResponse> => {
        try {
            const props: JSON = <JSON>(<unknown>{ year });
            const { body } = await http().post("/api/holiday/list", props);
            return {
                status: body.status,
                message: body.message,
                data: body.data
            }
        } catch(error) {
            console.log(error);
            throw error;
        }

    }


    const fetchIndianHolidays = async (year: number): Promise<HolidaysResponse> => {
        try{
            const location = "India";
            const props: JSON = <JSON>(<unknown>{ year, location });
            const { body } = await http().post("/api/holiday/list", props);
            return {
                status: body.status,
                message: body.message,
                data: body.data
            }
        }catch(error){
            console.log(error);
            throw error;
        }
    }


    const fetchDubaiHolidays = async (year: number): Promise<HolidaysResponse> => {
        try{
            const location = "Dubai";
            const props: JSON = <JSON>(<unknown>{ year, location });
            const { body } = await http().post("/api/holiday/list", props);
            return {
                status: body.status,
                message: body.message,
                data: body.data
            }
        }catch(error){
            console.log(error);
            throw error;
        }
    }


    return{
        fetchAllHolidays,
        fetchIndianHolidays,
        fetchDubaiHolidays
    }
}
