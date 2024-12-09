import ReviewTabs from "@/module/review-timesheet/components/review-tabs/review-tabs";
import ReviewTimesheet from "@/module/review-timesheet/views/review-timesheet";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  return( 
  <>
    <ReviewTimesheet />
  </>
  );
}
