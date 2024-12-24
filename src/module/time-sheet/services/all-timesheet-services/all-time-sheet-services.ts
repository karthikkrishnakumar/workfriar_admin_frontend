/**
 * Service module for handling all timesheet-related operations.
 * This module contains various functions for fetching, saving, and managing timesheets.
 */

import { AllTimesheetResponse, FetchProjectsResponse, FetchTaskCategoriesResponse, PostResponses, RejectedTimesheetResponse, TimesheetDataTable, TimesheetsCountResponse, WeeksOverViewResponse } from "@/interfaces/timesheets/timesheets";
import { normalizedDateString } from "@/utils/date-formatter-util/date-formatter";
import http from "@/utils/http";

export default function UseAllTimesheetsServices() {

    /**
     * Fetches all timesheets within a given date range.
     * @param startRawDate - The raw start date as a string.
     * @param endRawDate - The raw end date as a string.
     * @returns A promise that resolves to the response containing all timesheets.
     */
    const fetchAllTimesheets = async (
        startRawDate: string,
        endRawDate: string
    ): Promise<AllTimesheetResponse> => {
        try {
            const startDate = normalizedDateString(startRawDate);
            const endDate = normalizedDateString(endRawDate);
            const props: JSON = <JSON>(<unknown>{ startDate, endDate });
            const { body } = await http().post("/api/timesheet/get-weekly-timesheets", props);
            return {
                status: body.status,
                data: body.data || null,
                message: body.message,
                errors: body.errors || null,
                weekDates: body.weekDates
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    /**
     * Fetches the count of timesheets by their statuses.
     * @returns A promise that resolves to the response containing timesheets count.
     */
    const fetchTimesheetsCounts = async (): Promise<TimesheetsCountResponse> => {
        try {
            const { body } = await http().post("/api/timesheet/get-timesheet-status");
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

    /**
     * Fetches weeks overview for past due timesheets.
     * @returns A promise that resolves to the response containing past due weeks overview.
     */
    const fetchPastDueWeeks = async (): Promise<WeeksOverViewResponse> => {
        try {
            const status = 'saved';
            const props: JSON = <JSON>(<unknown>{ status });
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

    /**
     * Fetches all past due timesheets within a given date range.
     * @param startDate - The start date as a string.
     * @param endDate - The end date as a string.
     * @returns A promise that resolves to the response containing past due timesheets.
     */
    const fetchPastDueTimesheets = async (startDate: string, endDate: string): Promise<AllTimesheetResponse> => {
        try {
            const props: JSON = <JSON>(<unknown>{ startDate, endDate });
            const { body } = await http().post("/api/admin/getduetimesheet", props);
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

    /**
     * Fetches weeks overview for approved timesheets.
     * @returns A promise that resolves to the response containing approved weeks overview.
     */
    const fetchApprovedWeeks = async (): Promise<WeeksOverViewResponse> => {
        try {
            const status = 'accepted';
            const props: JSON = <JSON>(<unknown>{ status });
            const { body } = await http().post("/api/admin/pastdue", props);
            console.log(body);
            return {
                status: body.status,
                data: body.data || null,
                message: body.message,
                errors: body.errors || null,
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    /**
     * Fetches approved timesheets within a given date range.
     * @param startDate - The start date as a string.
     * @param endDate - The end date as a string.
     * @returns A promise that resolves to the response containing approved timesheets.
     */
    const fetchApprovedTimesheets = async (startDate: string, endDate: string): Promise<AllTimesheetResponse> => {
        try {
            const status = "accepted";
            const props: JSON = <JSON>(<unknown>{ startDate, endDate, status });
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

    /**
     * Fetches weeks overview for rejected timesheets.
     * @returns A promise that resolves to the response containing rejected weeks overview.
     */
    const fetchRejectedWeeks = async (): Promise<WeeksOverViewResponse> => {
        try {
            const status = 'rejected';
            const props: JSON = <JSON>(<unknown>{ status });
            const { body } = await http().post("/api/admin/pastdue", props);
            console.log(body);
            return {
                status: body.status,
                data: body.data || null,
                message: body.message,
                errors: body.errors || null,
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    /**
     * Saves all provided timesheets.
     * @param timesheet - An array of timesheet data to save.
     * @returns A promise that resolves to the response of the save operation.
     */
    const saveAllTimesheets = async (timesheet: TimesheetDataTable[]): Promise<PostResponses> => {
        try {
            const timesheets = timesheet.map((task) => {
                return {
                    passedDate: task.data_sheet[0].date,
                    timesheetId: task.timesheet_id ? task.timesheet_id : null,
                    ...task
                };
            });
            const props: JSON = <JSON>(<unknown>{ timesheets });
            const { body } = await http().post("/api/timesheet/save-timesheets", props);


            return {
                status: body.status,
                message: body.message,
                data: body.data
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    /**
     * Fetches rejected timesheets within a given date range.
     * @param startDate - The start date as a string.
     * @param endDate - The end date as a string.
     * @returns A promise that resolves to the response containing rejected timesheets.
     */
    const fetchRejectedTimesheets = async (startDate: string, endDate: string): Promise<RejectedTimesheetResponse> => {
        try {
            const status = "rejected";
            const props: JSON = <JSON>(<unknown>{ startDate, endDate, status });
            const { body } = await http().post("/api/admin/getduetimesheet", props);
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

    /**
     * Fetches task categories for a specific project.
     * @param projectId - The ID of the project.
     * @returns A promise that resolves to the response containing task categories.
     */
    const fetchTaskCategories = async (projectId: string): Promise<FetchTaskCategoriesResponse> => {
        try {
            const props: JSON = <JSON>(<unknown>{ projectId });
            const { body } = await http().post('/api/project/get-categories', props);
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

    /**
     * Fetches projects available to add a new timesheet.
     * @returns A promise that resolves to the response containing projects list.
     */
    const fetchProjectsToAddNewTimesheet = async (): Promise<FetchProjectsResponse> => {
        try {
            const { body } = await http().post('/api/project/list-projects-by-user');
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


    /**
     * Submit all provided timesheets.
     * @param timesheet - An array of timesheet data to save.
     * @returns A promise that resolves to the response of the save operation.
     */
    const submitAllTimesheets = async (timesheet: TimesheetDataTable[]): Promise<PostResponses> => {
        try {
            const timesheets = timesheet.map((task) => task.timesheet_id);
            const props: JSON = <JSON>(<unknown>{ timesheets });
            const { body } = await http().post('/api/timesheet/submit-timesheets', props);
            return body;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /**
     * Saves all provided timesheets.
     * @param timesheetId - An array of timesheet data to save.
     * @returns A promise that resolves to the response of the save operation.
     */
    const deleteTimesheet = async (timesheetId: string): Promise<PostResponses> => {
        try {
            const props: JSON = <JSON>(<unknown>{ timesheetId });
            const { body } = await http().post('/api/timesheet/delete-timesheet', props);
            return body;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }



    return {
        fetchAllTimesheets,
        fetchApprovedWeeks,
        fetchTimesheetsCounts,
        fetchPastDueWeeks,
        saveAllTimesheets,
        fetchPastDueTimesheets,
        fetchApprovedTimesheets,
        fetchRejectedWeeks,
        fetchRejectedTimesheets,
        fetchTaskCategories,
        fetchProjectsToAddNewTimesheet,
        submitAllTimesheets,
        deleteTimesheet
    };
}
