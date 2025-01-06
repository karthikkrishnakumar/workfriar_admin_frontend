import { FetchReviewTimsheetResponses } from "@/interfaces/review-timesheets/review-timesheets";
import http from "@/utils/http";

export default function UseReviewTimesheets() {
    
    const fetchAllReviewTimesheets = async(userId:string):Promise<FetchReviewTimsheetResponses> => {
        try{
            const props: JSON = <JSON>(<unknown>{ userId });
            const {body} = await http().post("/api/timesheet/review", props);
            return {
                status: body.status,
                message: body.message,
                data: body.data
            }

            
        }catch(error){
            console.error(error)
            throw error;
        }
    }

    return{
        fetchAllReviewTimesheets
    }
}