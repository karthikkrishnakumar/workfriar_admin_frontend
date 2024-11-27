"use client";


import React, { useState } from "react";
import ProjectSelector from "@/module/time-sheet/components/project-selector/project-selector";
import TimeInput from "@/themes/components/time-input/time-input";
import TaskSelector from "@/module/time-sheet/components/task-selector/task-selector";

export default function Page() {
  const [time,setTime] = useState("")


  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <TaskSelector />
    </div>
  );
}
