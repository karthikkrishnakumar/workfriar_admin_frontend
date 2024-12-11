"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import styles from "./dropdown-menu.module.scss";

interface MenuItem {
  key: string;
  label: React.ReactNode;
  onClick?: () => void;
}

interface DropdownProps {
  menuItems: MenuItem[];
  trigger?: ("click" | "hover" | "contextMenu")[];
  icon?: React.ReactNode;
  wrapperClassName?: string;
  dropdownClassName?: string;
  minWidth?: string; // New prop for inline min-width
}

const DropdownMenu: React.FC<DropdownProps> = ({
  menuItems,
  trigger = ["click"],
  icon,
  wrapperClassName = "",
  dropdownClassName = "",
  minWidth = "150px", // Default minWidth value
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (visible: boolean) => {
    setOpen(visible);
  };

  const handleScroll = useCallback(() => {
    if (open) {
      setOpen(false);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [open, handleScroll]);

  // Define menu with custom className for hover effect
  const menu: MenuProps = {
    items: menuItems,
    className: styles.customMenu, 
  };

  return (
    <Dropdown
      open={open}
      onOpenChange={handleOpenChange}
      trigger={trigger}
      overlayClassName={`${styles.dropdownMenuOverlay} ${dropdownClassName}`}
      overlayStyle={{ minWidth }}
      menu={menu}
    >
      <div className={`${styles.triggerWrapper} ${wrapperClassName}`}>
        {icon}
      </div>
    </Dropdown>
  );
};

export default DropdownMenu;
