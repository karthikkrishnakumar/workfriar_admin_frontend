"use client";

import React, { useRef, useState } from "react";


export default function Page() {
  const [isVisible, setIsVisible] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={parentRef} style={{ margin: "100px" }}>
      <button onClick={() => setIsVisible(!isVisible)}>Toggle Dropdown</button>
    </div>
  );
}
