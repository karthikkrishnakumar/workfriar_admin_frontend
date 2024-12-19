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
  dropdownItems?: { label: string; onClick: () => void }[] | undefined;
  onClickFunction?: () => void;
}

const NavBlock: React.FC<NavBlockProps> = ({
  title,
  activeStatus,
  defaultIcon,
  activeIcon,
  collapsible,
  dropdownItems,
  onClickFunction,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menu = (
    <Menu
      className={styles.blackThemeMenu}
      onMouseLeave={() => {
        setIsDropdownOpen(false); // Close dropdown when mouse leaves
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

  return (
    <div
      className={classNames(styles.navBlockWrapper, {
        [styles.active]: activeStatus || isDropdownOpen, // Make block active if dropdown is open
      })}
      role="button"
      tabIndex={0}
      aria-pressed={activeStatus || isDropdownOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={collapsible ? onClickFunction : onClickFunction}
      onKeyDown={handleKeyPress}
    >
      <div className={styles.titleAndIcon}>
        <span className={styles.defaultIcon}>
          {!(isHovered || activeStatus || isDropdownOpen) && defaultIcon}
        </span>
        <span className={styles.dynamicIcon}>
          {(isHovered || activeStatus || isDropdownOpen) && activeIcon}
        </span>
        <h2>{title}</h2>
      </div>
      {collapsible && (
        <span
          className={styles.dropdownSpan}
          onMouseEnter={() => {
            setIsDropdownOpen(true); // Open dropdown when hovered
          }}
        >
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            className={styles.dropdownStyle}
            overlayStyle={{ zIndex: 1900 }}
            onOpenChange={(open) => setIsDropdownOpen(open)} // Track dropdown open state
          >
            <span>
              {isHovered || activeStatus || isDropdownOpen
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
