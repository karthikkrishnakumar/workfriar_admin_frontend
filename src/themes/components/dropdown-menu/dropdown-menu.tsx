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
  minWidth?: string;
  onOpenChange?: (open: boolean) => void; // New prop
}

const DropdownMenu: React.FC<DropdownProps> = ({
  menuItems,
  trigger = ["click"],
  icon,
  dropdownClassName = "",
  wrapperClassName = "", //triggerwrapper
  minWidth = "150px",
  onOpenChange,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (visible: boolean) => {
    setOpen(visible);
    if (onOpenChange) onOpenChange(visible); // Notify parent component
  };

  const handleScroll = useCallback(() => {
    if (open) {
      setOpen(false);
      if (onOpenChange) onOpenChange(false); // Notify parent component
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
