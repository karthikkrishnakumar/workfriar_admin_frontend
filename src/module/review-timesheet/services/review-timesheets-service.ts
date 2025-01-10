/**
 * Review Timesheets Services
 *
 * Provides a set of utility functions to interact with the API endpoints related to managing and reviewing timesheets.
 * Includes functions for fetching user details, managing timesheet statuses, retrieving timesheets based on their status,
 * and obtaining an overview of weeks with pending, approved, or rejected timesheets.
 *
 * @module UseReviewTimesheetsServices
 */

import {
    FetchReviewTimsheetResponses,
    ManageTimesheetStatusResponse,
    UserDetailsResponse
} from "@/interfaces/review-timesheets/review-timesheets";
import { SentOverdueNotificationResponse, TimesheetsCountResponse, WeeksOverViewResponse } from "@/interfaces/timesheets/timesheets";
import { normalizedDateString } from "@/utils/date-formatter-util/date-formatter";
import http from "@/utils/http";

/**
 * Hook to provide review timesheets services.
 *
 * @returns {Object} Functions for interacting with timesheets.
 */
export default function UseReviewTimesheetsServices() {

    /**
     * Fetches user details by user ID.
     *
     * @async
     * @param {string} userId - The ID of the user to fetch details for.
     * @returns {Promise<UserDetailsResponse>} Resolves with user details.
     */
    const fetchUserDetails = async (userId: string): Promise<UserDetailsResponse> => {
        try {
            const props: JSON = <JSON>(<unknown>{ userId });
            const { body } = await http().post("/api/admin/profile-view", props);
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
     * Fetches all review timesheets for a given user within a date range.
     *
     * @async
     * @param {string} userId - The ID of the user to fetch timesheets for.
     * @param {string} startDateString - Start date of the range in string format.
     * @param {string} endDateString - End date of the range in string format.
     * @returns {Promise<FetchReviewTimsheetResponses>} Resolves with review timesheets.
     */
    const fetchAllReviewTimesheets = async (
        user_id: string,
        startDateString: string,
        endDateString: string
    ): Promise<FetchReviewTimsheetResponses> => {
        try {
            const startDate = normalizedDateString(startDateString);
            const endDate = normalizedDateString(endDateString);
            const props: JSON = <JSON>(<unknown>{ startDate, endDate, user_id });
            const { body } = await http().post("/api/admin/get-all-weekly-timesheets-for-review", props);
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
     * Manages the status of a timesheet.
     *
     * @async
     * @param {string} timesheetid - The ID of the timesheet to manage.
     * @param {string} status - New status for the timesheet ("approve" or "reject").
     * @returns {Promise<ManageTimesheetStatusResponse>} Resolves with the response of the operation.
     */
    const manageTimesheetStatus = async (
        timesheetid: string,
        status: string
    ): Promise<ManageTimesheetStatusResponse> => {
        try {
            const state = status === "approve" ? "accepted" : "rejected";
            const props: JSON = <JSON>(<unknown>{ timesheetid, state });
            const { body } = await http().post("/api/admin/managetimesheet", props);
            return {
                status: body.status,
                message: body.message,
                errors: body.errors || null
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    /**
     * Fetches counts of timesheets grouped by status for a user.
     *
     * @async
     * @param {string} user_id - The ID of the user.
     * @returns {Promise<TimesheetsCountResponse>} Resolves with timesheet counts.
     */
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

    /**
     * Fetches weeks with pending timesheets for a user.
     *
     * @async
     * @param {string} passedUserid - The ID of the user.
     * @returns {Promise<WeeksOverViewResponse>} Resolves with pending weeks.
     */
    const fetchPendingWeeks = async (passedUserid: string): Promise<WeeksOverViewResponse> => {
        try {
            const status = "submitted";
            const props: JSON = <JSON>(<unknown>{ status, passedUserid });
            const { body } = await http().post("/api/timesheet/pastdue", props);

            return {
                status: body.status,
                data: body.data || null,
                message: body.message,
                errors: body.errors || null
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    /**
     * Fetches pending timesheets within a date range for a user.
     *
     * @async
     * @param {string} passedUserid - The ID of the user.
     * @param {string} startDate - Start date of the range.
     * @param {string} endDate - End date of the range.
     * @returns {Promise<FetchReviewTimsheetResponses>} Resolves with pending timesheets.
     */
    const fetchPendingTimesheets = async (
        passedUserid: string,
        startDate: string,
        endDate: string
    ): Promise<FetchReviewTimsheetResponses> => {
        try {
            const status = "submitted";
            const props: JSON = <JSON>(<unknown>{ passedUserid, startDate, endDate, status });
            const { body } = await http().post("/api/timesheet/getduetimesheet", props);
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
     * Fetches weeks with approved timesheets for a user.
     *
     * @async
     * @param {string} passedUserid - The ID of the user.
     * @returns {Promise<WeeksOverViewResponse>} Resolves with approved weeks.
     */
    const fetchApprovedWeeks = async (passedUserid: string): Promise<WeeksOverViewResponse> => {
        try {
            const status = "accepted";
            const props: JSON = <JSON>(<unknown>{ status, passedUserid });
            const { body } = await http().post("/api/timesheet/pastdue", props);

            return {
                status: body.status,
                data: body.data || null,
                message: body.message,
                errors: body.errors || null
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    /**
     * Fetches approved timesheets within a date range for a user.
     *
     * @async
     * @param {string} passedUserid - The ID of the user.
     * @param {string} startDate - Start date of the range.
     * @param {string} endDate - End date of the range.
     * @returns {Promise<FetchReviewTimsheetResponses>} Resolves with approved timesheets.
     */
    const fetchApprovedTimesheets = async (
        passedUserid: string,
        startDate: string,
        endDate: string
    ): Promise<FetchReviewTimsheetResponses> => {
        try {
            const status = "accepted";
            const props: JSON = <JSON>(<unknown>{ passedUserid, startDate, endDate, status });
            const { body } = await http().post("/timesheet/getduetimesheet", props);
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
     * Fetches weeks with rejected timesheets for a user.
     *
     * @async
     * @param {string} passedUserid - The ID of the user.
     * @returns {Promise<WeeksOverViewResponse>} Resolves with rejected weeks.
     */
    const fetchRejectedWeeks = async (passedUserid: string): Promise<WeeksOverViewResponse> => {
        try {
            const status = "rejected";
            const props: JSON = <JSON>(<unknown>{ status, passedUserid });
            const { body } = await http().post("/api/timesheet/pastdue", props);

            return {
                status: body.status,
                data: body.data || null,
                message: body.message,
                errors: body.errors || null
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    /**
     * Fetches rejected timesheets within a date range for a user.
     *
     * @async
     * @param {string} passedUserid - The ID of the user.
     * @param {string} startDate - Start date of the range.
     * @param {string} endDate - End date of the range.
     * @returns {Promise<FetchReviewTimsheetResponses>} Resolves with rejected timesheets.
     */
    const fetchRejectedTimesheets = async (
        passedUserid: string,
        startDate: string,
        endDate: string
    ): Promise<FetchReviewTimsheetResponses> => {
        try {
            const status = "rejected";
            const props: JSON = <JSON>(<unknown>{ passedUserid, startDate, endDate, status });
            const { body } = await http().post("/api/timesheet/getduetimesheet", props);
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
     * Fetches weeks with overdue timesheets for a user.
     *
     * @async
     * @param {string} passedUserid - The ID of the user.
     * @returns {Promise<WeeksOverViewResponse>} Resolves with overdue weeks.
     */
    const fetchOverDueWeeks = async (passedUserid: string): Promise<WeeksOverViewResponse> => {
        try {
            const status = "saved";
            const props: JSON = <JSON>(<unknown>{ status, passedUserid });
            const { body } = await http().post("/api/timesheet/pastdue", props);

            return {
                status: body.status,
                data: body.data || null,
                message: body.message,
                errors: body.errors || null
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    /**
     * Sent notification about overdue to user.
     *
     * @async
     * @param {string} user_id - The ID of the user.
     * @param {string} date_range Te date range for message.
     * @returns {Promise<WeeksOverViewResponse>} Resolves with overdue weeks.
     */
    const sentOverdueNotification = async (user_id:string, date_range:string): Promise<SentOverdueNotificationResponse> => {
        try{
            const props: JSON = <JSON>(<unknown>{ user_id, date_range });
            const { body } = await http().post("/api/admin/notify-user", props);

            return {
                status: body.status,
                message: body.message,
                errors: body.errors || null
            };
        }catch(error){
            console.error(error);
            throw error;
        }
    }

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
        fetchOverDueWeeks,
        sentOverdueNotification
    };
}