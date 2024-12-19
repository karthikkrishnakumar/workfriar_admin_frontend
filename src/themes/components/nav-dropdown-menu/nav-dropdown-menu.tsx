// components/nav-dropdown-menu/nav-dropdown-menu.tsx
import React from "react";

interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface DropdownItemsProps {
  label: string;
}

const DropdownItems: React.FC<DropdownItemsProps> = ({ label }) => {
  // Define the dropdown items based on the label
  let dropdownItems: DropdownItem[] | undefined;

  switch (label) {
    case "Reports":
      dropdownItems = [
        { label: "Timesheet report", onClick: () => console.log("Timesheet report clicked") },
        { label: "Project status report", onClick: () => console.log("Project status report clicked") },
      ];
      break;
    case "Settings":
      dropdownItems = [
        { label: "Account settings", onClick: () => console.log("Account settings clicked") },
        { label: "Privacy settings", onClick: () => console.log("Privacy settings clicked") },
      ];
      break;
    case "Projects":
      dropdownItems = [
        { label: "New Project", onClick: () => console.log("New Project clicked") },
        { label: "Manage Projects", onClick: () => console.log("Manage Projects clicked") },
      ];
      break;
    // Add more cases for other blocks as needed
    default:
      dropdownItems = undefined;
      break;
  }

  // Map the dropdown items to JSX elements (e.g., buttons or list items)
  return (
    <div>
      {dropdownItems?.map((item, index) => (
        <button key={index} onClick={item.onClick}>
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default DropdownItems;
