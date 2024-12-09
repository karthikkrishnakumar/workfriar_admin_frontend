"use client";

import React from "react";
import TabComponent from "@/themes/components/tabs/tabs";
import ForecastDetails from "../forecast-details/forecast-details";

/**
 * Interface representing the project tabs structure.
 * @interface ProjectTabsProps
 */
interface ProjectTabsProps {
  id: string;
}

const ProjectForecastTabs = ({ id }: ProjectTabsProps) => {
  const tabs = [
    { key: "1", label: "Forecast", content: <ForecastDetails id={id} /> },
  ];
  return (
    <div>
      <div>
        <TabComponent headings={tabs} />
      </div>
    </div>
  );
};

export default ProjectForecastTabs;
