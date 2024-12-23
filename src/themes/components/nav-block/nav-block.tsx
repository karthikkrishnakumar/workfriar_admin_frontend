import React, { ReactNode, useState } from "react";
import classNames from "classnames";
import { Dropdown, Menu } from "antd";
import styles from "./nav-block.module.scss";
import Icons from "@/themes/images/icons/icons";

interface NavBlockProps {
  title: string;
  activeStatus: boolean;
  defaultIcon: ReactNode;
  activeIcon: ReactNode;
  collapsible: boolean;
  dropdownItems?: { label: string; onClick: () => void }[];
  onClickFunction?: () => void;
  isDropdownSelected?: boolean; // New prop to track if any dropdown item is selected
}

const NavBlock: React.FC<NavBlockProps> = ({
  title,
  activeStatus,
  defaultIcon,
  activeIcon,
  collapsible,
  dropdownItems,
  onClickFunction,
  isDropdownSelected,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menu = (
    <Menu
      className={styles.blackThemeMenu}
      onMouseLeave={() => {
        setIsDropdownOpen(false);
      }}
    >
      {dropdownItems?.map((item, index) => (
        <Menu.Item key={index} onClick={item.onClick}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      onClickFunction?.();
    }
  };

  // Only show active state if the item is active and not overridden by a dropdown selection
  const isActive = activeStatus && (!collapsible || !isDropdownSelected);

  return (
    <div
      className={classNames(styles.navBlockWrapper, {
        [styles.active]: isActive,
      })}
      role="button"
      tabIndex={0}
      aria-pressed={isActive || isDropdownOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClickFunction}
      onKeyDown={handleKeyPress}
    >
      <div className={styles.titleAndIcon}>
        <span className={styles.defaultIcon}>
          {!(isHovered || isActive) && defaultIcon}
        </span>
        <span className={styles.dynamicIcon}>
          {(isHovered || isActive || isDropdownOpen) && activeIcon}
        </span>
        <h2>{title}</h2>
      </div>
      {collapsible && (
        <span
          className={styles.dropdownSpan}
          onMouseEnter={() => {
            setIsDropdownOpen(true);
          }}
        >
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            className={styles.dropdownStyle}
            overlayStyle={{
              zIndex: 1900,
              position: "fixed",
            }}
            onOpenChange={(open) => setIsDropdownOpen(open)}
            placement="bottomLeft"
          >
            <span>
              {isHovered || isActive || isDropdownOpen
                ? Icons.arrowRightDark
                : Icons.arrowRightLight}
            </span>
          </Dropdown>
        </span>
      )}
    </div>
  );
};

export default NavBlock;
