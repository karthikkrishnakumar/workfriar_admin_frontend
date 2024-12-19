
import { DatePickerData } from "@/themes/components/date-picker/date-picker";
import http from "@/utils/http";

// function to fetch all counts of timesheet


async function fetchWeeks(
    setWeeks: (weeks: DatePickerData[]) => void,
    keyDate?: string
): Promise<void> {
    try {
        const date = keyDate ? new Date(keyDate) : new Date().toISOString().split('T')[0];
        const props: JSON = <JSON>(<unknown>{ date });
        const { body } = await http().post(
            "/api/user/getdates",
            props);

        setWeeks(body.data);
    } catch (error) {
        console.error(error)
    }
}





export {  fetchWeeks }