"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux"; 
import ModuleHeader from "../module-header-new/module-header-new";
import { openModal } from "@/redux/slices/modalSlice";

const ModuleHeaderWrapper = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  // Define the pages and their corresponding data
  const pages = [
    { title: "Dashboard", path: "/dashboard", backButtonNeeded: false, actionButtonNeeded: false, modalType: null },
    { title: "Timesheet", path: "/time-sheet", backButtonNeeded: false, actionButtonNeeded: false, modalType: null },
    { title: "Project List", path: "/projects", backButtonNeeded: false, actionButtonNeeded: false, modalType: null },
    { title: "Client", path: "/projects/client", backButtonNeeded: false, actionButtonNeeded: false, modalType: null },
    { title: "Task Category", path: "/projects/task-category", backButtonNeeded: false, actionButtonNeeded: false, modalType: null },
    { title: "Project Team", path: "/projects/project-team", backButtonNeeded: false, actionButtonNeeded: false, modalType: null },
    { title: "Organization", path: "/organization", backButtonNeeded: false, actionButtonNeeded: false, modalType: null },
    { title: "Project forecast", path: "/project-forecast", backButtonNeeded: false, actionButtonNeeded: false, modalType: null },
    { title: "Timesheet Report", path: "/time-sheet-report", backButtonNeeded: false, actionButtonNeeded: false, modalType: null },
    { title: "Profile", path: "/profile", backButtonNeeded: true, actionButtonNeeded: false, modalType: null },
    { title: "Project Status Report", path: "/project-status-report", backButtonNeeded: false, actionButtonNeeded: false, modalType: null },
    { title: "Report details", path: "/project-status-report/report-details/[id]", backButtonNeeded: true, actionButtonNeeded: false, modalType: null },
    { title: "Review Timesheet", path: "/time-sheet/review-timesheet/[id]", backButtonNeeded: true, actionButtonNeeded: false, modalType: null },
    { title: "Admin Settings", path: "/settings", backButtonNeeded: false, actionButtonNeeded: true, modalType: "roleModal" },
    { title: "Permissions Settings", path: "/settings/permissions", backButtonNeeded: false, actionButtonNeeded: false, modalType: null },
    { title: "Notifications", path: "/notifications", backButtonNeeded: false, actionButtonNeeded: false, modalType: null },
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
  const isActionButtonNeeded = currentPage?.actionButtonNeeded || false;
  const modalType = currentPage?.modalType;

  // Function to open the modal based on the page's modalType
  const openModalBasedOnPage = () => {
    if (modalType) {
      dispatch(openModal(modalType)); // Dispatch the modal based on the modalType in the pages data
    }
  };

  return (
    <ModuleHeader
      title={title}
      isBackButtonNeeded={isBackButtonNeeded}
      isActionButtonNeeded={isActionButtonNeeded}
      openModal={openModalBasedOnPage} 
    />
  );
};

export default ModuleHeaderWrapper;
