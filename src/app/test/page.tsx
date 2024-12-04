"use client";

import React, { useRef, useState } from "react";


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
