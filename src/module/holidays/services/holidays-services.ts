import { HolidaysResponse } from "@/interfaces/holidays/holidays";
import http from "@/utils/http";

/**
 * UseHolidayServices: Provides holiday-related services.
 * @returns {Object} An object containing functions to fetch holidays.
 */
export default function UseHolidayServices() {

    /**
     * Fetch all holidays for a given year.
     * @param {number} year - The year for which holidays are to be fetched.
     * @returns {Promise<HolidaysResponse>} A promise that resolves to a HolidaysResponse object.
     * @throws Will throw an error if the HTTP request fails.
     */
    const fetchAllHolidays = async (year: number): Promise<HolidaysResponse> => {
        try {
            const props: JSON = <JSON>(<unknown>{ year });
            const { body } = await http().post("/api/holiday/list", props);
            return {
                status: body.status,
                message: body.message,
                data: body.data
            };
        } catch (error) {
            console.error("Error fetching all holidays:", error);
            throw error;
        }
    };

    /**
     * Fetch holidays specific to India for a given year.
     * @param {number} year - The year for which Indian holidays are to be fetched.
     * @returns {Promise<HolidaysResponse>} A promise that resolves to a HolidaysResponse object.
     * @throws Will throw an error if the HTTP request fails.
     */
    const fetchIndianHolidays = async (year: number): Promise<HolidaysResponse> => {
        try {
            const location = "India";
            const props: JSON = <JSON>(<unknown>{ year, location });
            const { body } = await http().post("/api/holiday/list", props);
            return {
                status: body.status,
                message: body.message,
                data: body.data
            };
        } catch (error) {
            console.error("Error fetching Indian holidays:", error);
            throw error;
        }
    };

    /**
     * Fetch holidays specific to Dubai for a given year.
     * @param {number} year - The year for which Dubai holidays are to be fetched.
     * @returns {Promise<HolidaysResponse>} A promise that resolves to a HolidaysResponse object.
     * @throws Will throw an error if the HTTP request fails.
     */
    const fetchDubaiHolidays = async (year: number): Promise<HolidaysResponse> => {
        try {
            const location = "Dubai";
            const props: JSON = <JSON>(<unknown>{ year, location });
            const { body } = await http().post("/api/holiday/list", props);
            return {
                status: body.status,
                message: body.message,
                data: body.data
            };
        } catch (error) {
            console.error("Error fetching Dubai holidays:", error);
            throw error;
        }
    };

    return {
        fetchAllHolidays,
        fetchIndianHolidays,
        fetchDubaiHolidays
    };
}
