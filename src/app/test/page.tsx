"use client";
import EmployeeCard from "@/module/approval-center/components/employee-list-tab/employee-list/employee-card/employee-card";
import React, { useRef, useState } from "react";


export default function Page() {
  const [isVisible, setIsVisible] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={parentRef} style={{ margin: "100px" }}>
      <EmployeeCard name="Yadhu" />
    </div>
  );
}
