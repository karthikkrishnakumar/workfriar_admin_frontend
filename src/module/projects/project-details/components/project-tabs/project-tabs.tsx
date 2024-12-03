"use client";

import React from "react";
import TabComponent from "@/themes/components/tabs/tabs";
import ProjectDetails from "../project-details/project-details";
import TeamMembers from "../team-members/team-members";
import TimeSummary from "../time-summary/time-summary";

/**
 * Interface representing the project tabs structure.
 * @interface ProjectTabsProps
 */
interface ProjectTabsProps {
  id: string;
}

const ProjectTabs = ({ id }: ProjectTabsProps) => {
  const tabs = [
    { key: "1", label: "Project details", content: <ProjectDetails id={id} /> },
    { key: "2", label: "Team members", content: <TeamMembers id={id} /> },
    { key: "3", label: "Time Summary", content: <TimeSummary id={id} /> },
  ];
  return (
    <div>
      <div>
        <TabComponent headings={tabs} />
      </div>
    </div>
  );
};

export default ProjectTabs;
