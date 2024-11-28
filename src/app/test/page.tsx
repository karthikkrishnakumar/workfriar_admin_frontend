"use client";


import React, { useState } from "react";
import ProjectSelector from "@/module/time-sheet/components/project-selector/project-selector";
import TimeInput from "@/themes/components/time-input/time-input";
import TaskSelector from "@/module/time-sheet/components/task-selector/task-selector";
import TextAreaButton from "@/module/time-sheet/components/text-area-button/text-area-button";

export default function Page() {
  const [time,setTime] = useState("")


  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <TextAreaButton buttonvalue="HAlleoeoiwenwnvinrwni jecjhebjh" />
      <TimeInput value=""/>
    </div>
  );
}
