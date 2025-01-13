"use client";
import EmployeeCard from "@/module/approval-center/components/employee-list-tab/employee-list/employee-card/employee-card";
import StatusTag from "@/module/time-sheet/components/status-tag/status-tag";
import MultipleBodyTable, { BodyData } from "@/themes/components/multiple-body-table/multiple-body-table";
import React, { useRef, useState } from "react";

export default function Page() {

  

  return (
    <div>
      <StatusTag status="rejected" />
    </div>
  );
}
