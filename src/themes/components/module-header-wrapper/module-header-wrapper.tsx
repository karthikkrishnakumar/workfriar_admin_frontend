"use client";

import React from "react";
import { usePathname } from "next/navigation";
import ModuleHeader from "../module-header/module-header";

const ModuleHeaderWrapper = () => {
  const pathname = usePathname();

  // Define the pages and their corresponding data
  const pages = [
    { title: "Dashboard", path: "/dashboard", backButtonNeeded: false },
    { title: "Timesheet", path: "/time-sheet", backButtonNeeded: false },
    { title: "Project List", path: "/projects", backButtonNeeded: false },
    { title: "Client", path: "/projects/client", backButtonNeeded: false },
    { title: "Task Category", path: "/projects/task-category", backButtonNeeded: false },
    { title: "Project Team", path: "/projects/project-team", backButtonNeeded: false },
    { title: "Organization", path: "/organization", backButtonNeeded: false },
    { title: "Project forecast", path: "/project-forecast", backButtonNeeded: false },
    { title: "Time sheet reports", path: "/time-sheet-report", backButtonNeeded: false },
    { title: "Profile", path: "/profile", backButtonNeeded: true },
    { title: "Project Status Report", path: "/project-status-report", backButtonNeeded: false },
    { title: "Report details", path: "/project-status-report/report-details", backButtonNeeded: true  },
  ];

  // Find the matching page based on the current pathname
  const currentPage = pages.find((page) => page.path === pathname);

  // Fallback in case no matching page is found
  const title = currentPage?.title || "Default Title";
  const isBackButtonNeeded = currentPage?.backButtonNeeded || false;

  return (
        <ModuleHeader title={title} isBackButtonNeeded={isBackButtonNeeded} />
  );
};

export default ModuleHeaderWrapper;
