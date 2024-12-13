import React from "react";
import { Dropdown } from "antd";
import styles from "./status-dropdown-menu.module.scss";

interface StatusDropdownProps {
  /**
   * The current status to display in the dropdown.
   */
  status: string;
  /**
   * The menu items for the dropdown.
   */
  menuItems: { key: string; label: React.ReactNode }[];
  /**
   * Callback function triggered when a menu item is clicked.
   */
  onMenuClick: (key: string) => void;
  /**
   * Optional: Custom className for the dropdown container.
   */
  className?: string;
  /**
   * Optional: Custom icon for the dropdown arrow.
   */
  arrowIcon?: React.ReactNode;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  status,
  menuItems,
  onMenuClick,
  className,
  arrowIcon,
}) => {
  // Filter out the current status from the menu items
  const filteredMenuItems = menuItems.filter((item) => item.key !== status);

  return (
    <Dropdown
      menu={{
        items: filteredMenuItems,
        onClick: ({ key }) => onMenuClick(key),
      }}
      trigger={["click"]}
    >
      <span
        className={`${styles.statusDropdown} ${className || ""}`}
        style={{ cursor: "pointer" }}
      >
        <span>{status}</span>{" "}
        <span className={styles.arrow}>{arrowIcon}</span>
      </span>
    </Dropdown>
  );
};

export default StatusDropdown;
