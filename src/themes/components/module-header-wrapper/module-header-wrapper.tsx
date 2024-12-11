"use client";

import React from "react";
import { usePathname } from "next/navigation";
import ModuleHeader from "../module-header/module-header";
import { openModal } from "@/redux/slices/modalSlice";
import { useDispatch } from "react-redux";
import Icons from "@/themes/images/icons/icons";

const ModuleHeaderWrapper = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();


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
    { title: "Timesheet Report", path: "/time-sheet-report", backButtonNeeded: false },
    { title: "Profile", path: "/profile", backButtonNeeded: true },
    { title: "Project Status Report", path: "/project-status-report", backButtonNeeded: false },
    { title: "Report details", path: "/project-status-report/report-details/[id]", backButtonNeeded: true  },
    { title: "Review Timesheet", path: "/time-sheet/review-timesheet/[id]", backButtonNeeded: true  },
    { title: "Admin Settings", path: "/settings", backButtonNeeded: false },
    { title: "Permissions Settings", path: "/settings/permissions", backButtonNeeded: false },
    { title: "Notifications", path: "/notifications", backButtonNeeded: false },
    { title: "Employee Details", path: "/organization/employee-details/[id]", backButtonNeeded: true  },
  ];

  // Function to match the dynamic path
  const matchPath = (path: string, dynamicPath: string) => {
    const staticSegments = dynamicPath.split("/").filter((seg) => !seg.startsWith("["));
    return staticSegments.every((seg) => path.includes(seg));
  };


  // Find the matching page based on the current pathname
  const currentPage = pages.find((page) =>
    page.path.includes("[id]") ? matchPath(pathname, page.path) : page.path === pathname
  );

  // Fallback in case no matching page is found
  const title = currentPage?.title ?? "Default Title";
  const isBackButtonNeeded = currentPage?.backButtonNeeded || false;
  const actionButton = currentPage?.actionButton;

  // Function to open the modal based on the page's modalType
  const openModalBasedOnPage = () => {
    if (actionButton?.modalType) {
      dispatch(openModal(actionButton.modalType)); // Dispatch the modal based on the modalType in the pages data
    }
  };

  return (
        <ModuleHeader title={title} isBackButtonNeeded={isBackButtonNeeded}  actionButton={actionButton ? { ...actionButton, onClick: openModalBasedOnPage } : null} />
  );
};

export default ModuleHeaderWrapper;
