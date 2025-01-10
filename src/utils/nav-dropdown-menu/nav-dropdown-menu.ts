interface DropdownItem {
  label: string;
  path: string;
}

interface DropdownConfig {
  [key: string]: DropdownItem[] | undefined;
}

export const getDropdownItems = (label: string): DropdownItem[] | undefined => {
  const dropdownConfig: DropdownConfig = {
    Reports: [
      {
        label: "Timesheet report",
        path: "/time-sheet-report",
      },
      {
        label: "Project status report",
        path: "/project-status-report",
      },
    ],
    Settings: [
      {
        label: "Account settings",
        path: "/account-settings",
      },
      {
        label: "Privacy settings",
        path: "/privacy-settings",
      },
    ],
    Projects: [
      {
        label: "Project List",
        path: "/projects",
      },
      {
        label: "Client",
        path: "/projects/client",
      },
      {
        label: "Task Category",
        path: "/projects/task-category",
      },
      {
        label: "Project Team",
        path: "/projects/project-team",
      },
    ],
    Timesheet: [
      {
        label: "Timesheet",
        path: "/time-sheet"
      },
      {
        label: "Approval Center",
        path: "/time-sheet/approval-center"
      }
    ]
  };

  return dropdownConfig[label];
};

// Helper function to determine if a navigation item should be collapsible
export const isCollapsibleItem = (label: string): boolean => {
  return ["Reports", "Settings", "Projects", "Timesheet"].includes(label);
};

