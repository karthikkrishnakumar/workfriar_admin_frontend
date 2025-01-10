import { FetchReviewTimsheetResponses, ManageTimesheetStatusResponse, UserDetailsResponse } from "@/interfaces/review-timesheets/review-timesheets";
import { TimesheetsCountResponse, WeeksOverViewResponse } from "@/interfaces/timesheets/timesheets";
import { normalizedDateString } from "@/utils/date-formatter-util/date-formatter";
import http from "@/utils/http";

export default function UseReviewTimesheetsServices() {


    const fetchUserDetails = async (userId: string): Promise<UserDetailsResponse> => {
        try {
            const props: JSON = <JSON>(<unknown>{ userId });
            const { body } = await http().post("/api/admin/profile-view", props);
            return {
                status: body.status,
                message: body.message,
                data: body.data
            }
        } catch (error) {
            console.error(error)
            throw error;
        }
    }


    const fetchAllReviewTimesheets = async (userId: string, startDateString: string, endDateString: string): Promise<FetchReviewTimsheetResponses> => {
        try {
            const startDate = normalizedDateString(startDateString);
            const endDate = normalizedDateString(endDateString);
            const props: JSON = <JSON>(<unknown>{ startDate, endDate, userId });
            const { body } = await http().post("/api/timesheet/get-weekly-timesheets", props);
            console.log(body);
            return {
                status: body.status,
                data: body.data || null,
                message: body.message,
                errors: body.errors || null,
                weekDates: body.weekDates
            }
        } catch (error) {
            console.error(error)
            throw error;
        }
    }


    const manageTimesheetStatus = async (timesheetid: string, status: string): Promise<ManageTimesheetStatusResponse> => {
        try {
            const state = status === "approve" ? "accepted" : "rejected";
            const props: JSON = <JSON>(<unknown>{ timesheetid, state });
            const { body } = await http().post("/api/admin/managetimesheet", props);
            return {
                status: body.status,
                message: body.message,
                errors: body.errors || null,
            }
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    const fetchTimesheetsCounts = async (user_id: string): Promise<TimesheetsCountResponse> => {
        try {
            const props: JSON = <JSON>(<unknown>{ user_id });
            const { body } = await http().post("/api/timesheet/get-timesheet-status", props);
            return {
                status: body.status,
                message: body.message,
                errors: body.errors || null,
                data: body.data || null
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };


    const fetchPendingWeeks = async (passedUserid: string): Promise<WeeksOverViewResponse> => {
        try {
            const status = 'submitted';
            const props: JSON = <JSON>(<unknown>{ status, passedUserid });
            const { body } = await http().post("/api/admin/pastdue", props);

            return {
                status: body.status,
                data: body.data || null,
                message: body.message,
                errors: body.errors || null,
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const fetchPendingTimesheets = async (passedUserid: string, startDate: string, endDate: string): Promise<FetchReviewTimsheetResponses> => {
        try {
            const status = "submitted";
            const props: JSON = <JSON>(<unknown>{ passedUserid, startDate, endDate, status });
            const { body } = await http().post("/api/admin/getduetimesheet", props);
            console.log(body);
            return {
                status: body.status,
                data: body.data || null,
                message: body.message,
                weekDates: body.weekDates
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const fetchApprovedWeeks = async (passedUserid: string): Promise<WeeksOverViewResponse> => {
        try {
            const status = 'accepted';
            const props: JSON = <JSON>(<unknown>{ status, passedUserid });
            const { body } = await http().post("/api/admin/pastdue", props);

            return {
                status: body.status,
                data: body.data || null,
                message: body.message,
                errors: body.errors || null,
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const fetchApprovedTimesheets = async (passedUserid: string, startDate: string, endDate: string): Promise<FetchReviewTimsheetResponses> => {
        try {
            const status = "accepted";
            const props: JSON = <JSON>(<unknown>{ passedUserid, startDate, endDate, status });
            const { body } = await http().post("/api/admin/getduetimesheet", props);
            console.log(body);
            return {
                status: body.status,
                data: body.data || null,
                message: body.message,
                weekDates: body.weekDates
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const fetchRejectedWeeks = async (passedUserid: string): Promise<WeeksOverViewResponse> => {
        try {
            const status = 'rejected';
            const props: JSON = <JSON>(<unknown>{ status, passedUserid });
            const { body } = await http().post("/api/admin/pastdue", props);

            return {
                status: body.status,
                data: body.data || null,
                message: body.message,
                errors: body.errors || null,
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const fetchRejectedTimesheets = async (passedUserid: string, startDate: string, endDate: string): Promise<FetchReviewTimsheetResponses> => {
        try {
            const status = "rejected";
            const props: JSON = <JSON>(<unknown>{ passedUserid, startDate, endDate, status });
            const { body } = await http().post("/api/admin/getduetimesheet", props);
            console.log(body);
            return {
                status: body.status,
                data: body.data || null,
                message: body.message,
                weekDates: body.weekDates
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };


    const fetchOverDueWeeks = async (passedUserid: string): Promise<WeeksOverViewResponse> => {
        try {
            const status = 'saved';
            const props: JSON = <JSON>(<unknown>{ status, passedUserid });
            const { body } = await http().post("/api/admin/pastdue", props);

            return {
                status: body.status,
                data: body.data || null,
                message: body.message,
                errors: body.errors || null,
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };




    return {
        manageTimesheetStatus,
        fetchAllReviewTimesheets,
        fetchUserDetails,
        fetchTimesheetsCounts,
        fetchPendingWeeks,
        fetchPendingTimesheets,
        fetchApprovedWeeks,
        fetchApprovedTimesheets,
        fetchRejectedWeeks,
        fetchRejectedTimesheets,
        fetchOverDueWeeks
    }
}