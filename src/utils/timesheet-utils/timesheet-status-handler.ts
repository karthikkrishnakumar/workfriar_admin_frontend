import { TimesheetDataTable } from "@/interfaces/timesheets/timesheets";
import { setStatus, setStatusOfAcceptedTimesheet, setStatusOfAllTImeSheet, setStatusOfPastDueTimesheet, setStatusOfRejectedTimesheet } from "@/redux/slices/timesheetSlice"
import { AppDispatch } from "@/redux/store";

/**
   * Set status to the timeheets tab
   */
export const assignStatus = (
    timesheets: TimesheetDataTable[],
    dispatch: AppDispatch,
    timesheetType: "all" | "pastDue" | "accepted" | "rejected"
) => {
    // Dispatch the evaluated status to Redux
    // Priority-based status evaluation
    let hasAccepted = false;
    let hasRejected = false;
    let hasSubmitted = false;
    let hasSaved = false;

    // Determine overallStatus based on priority
    let overallStatus: string | undefined = undefined;

    if(timesheets.length === 0){
        overallStatus = undefined;
        dispatch(setStatus(overallStatus));
        return;
    }

    // Evaluate the presence of each status
    for (const timesheet of timesheets) {
        if (timesheet.status === "accepted") hasAccepted = true;
        if (timesheet.status === "rejected") hasRejected = true;
        if (timesheet.status === "submitted") hasSubmitted = true;
        if (timesheet.status === "saved") hasSaved = true;
    }

    

    if (hasAccepted && hasRejected) {
        overallStatus = undefined; // Both accepted and rejected
    } else if (hasAccepted) {
        overallStatus = "accepted";
    } else if (hasRejected) {
        overallStatus = "rejected";
    } else if (hasSubmitted) {
        overallStatus = "submitted";
    } else if (hasSaved) {
        overallStatus = "saved";
    }
    switch (timesheetType) {
        case "all":
            dispatch(setStatusOfAllTImeSheet(overallStatus));
            handleTabChanageToSetStatusChange( dispatch,overallStatus!);
            break;
        case "pastDue":
            dispatch(setStatusOfPastDueTimesheet(overallStatus));
            handleTabChanageToSetStatusChange( dispatch,overallStatus!);
            break;
        case "accepted":
            dispatch(setStatusOfAcceptedTimesheet(overallStatus));
            handleTabChanageToSetStatusChange( dispatch,overallStatus!);
            break;
        case "rejected":
            dispatch(setStatusOfRejectedTimesheet(overallStatus));
            handleTabChanageToSetStatusChange( dispatch,overallStatus!);
            break;
    }

    
}

export const handleTabChanageToSetStatusChange = (dispatch: AppDispatch,status:string) => {
    dispatch(setStatus(status));
}
