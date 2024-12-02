"use client";

import React, { useRef, useState } from "react";
import ProjectSelector from "@/module/time-sheet/components/project-selector/project-selector";
import TimeInput from "@/themes/components/time-input/time-input";
import TaskSelector from "@/module/time-sheet/components/task-selector/task-selector";
import TextAreaButton from "@/module/time-sheet/components/text-area-button/text-area-button";
import { Button, Dropdown } from "antd";
import CustomMenu from "@/themes/menu-component/menu-component";

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={parentRef} style={{ margin: "100px" }}>
      <button onClick={() => setIsVisible(!isVisible)}>Toggle Dropdown</button>

      <CustomMenu
        isVisible={isVisible}
        content={<div>Main Modal Content</div>}
        theme="white"
        onClose={() => setIsVisible(false)}
        parentRef={parentRef}
        offsetTop={10}
        offsetLeft={5}
        showSubModal={true}
        subModalContent={<div>Sub Modal Content</div>}
      />
    </div>
  );
}
