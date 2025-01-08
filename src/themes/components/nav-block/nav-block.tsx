import React, { ReactNode, useState, useRef } from "react";
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
  isDropdownSelected?: boolean;
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
  const [isArrowHovered, setIsArrowHovered] = useState(false);
  const navBlockRef = useRef<HTMLDivElement>(null);

  // Only show active state when actually active or dropdown item is selected
  const isActive = activeStatus || isDropdownSelected;
  
  // Show active icon on hover or when actually active
  const showActiveIcon = isHovered || isActive || isArrowHovered;

  const resetAllHoverStates = () => {
    if (!isDropdownOpen) {
      setIsHovered(false);
      setIsArrowHovered(false);
    }
  };

  const menu = (
    <Menu
      className={styles.blackThemeMenu}
      onMouseEnter={() => {
        setIsDropdownOpen(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsDropdownOpen(false);
        resetAllHoverStates();
      }}
    >
      {dropdownItems?.map((item, index) => (
        <Menu.Item key={index} onClick={item.onClick}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  React.useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      const navBlock = navBlockRef.current;
      const relatedTarget = e.relatedTarget as Node;

      if (navBlock && !navBlock.contains(relatedTarget) && !isDropdownOpen) {
        resetAllHoverStates();
      }
    };

    const navBlock = navBlockRef.current;
    navBlock?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      navBlock?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDropdownOpen]);

  return (
    <div
      ref={navBlockRef}
      className={classNames(styles.navBlockWrapper, {
        [styles.active]: isActive,
        [styles.hovered]: isHovered || isArrowHovered || isDropdownOpen,
      })}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClickFunction}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClickFunction?.();
      }}
    >
      <div className={styles.titleAndIcon}>
        {!showActiveIcon && <span className={styles.defaultIcon}>{defaultIcon}</span>}
        {showActiveIcon && <span className={styles.dynamicIcon}>{activeIcon}</span>}
        <h2>{title}</h2>
      </div>
      {collapsible && (
        <span
          className={styles.dropdownSpan}
          onMouseEnter={() => {
            setIsArrowHovered(true);
            setIsHovered(true);
          }}
        >
          <Dropdown
            overlay={menu}
            trigger={["click", "hover"]}
            className={styles.dropdownStyle}
            overlayStyle={{
              zIndex: 1900,
              position: "fixed",
            }}
            onOpenChange={(open) => {
              setIsDropdownOpen(open);
              if (!open) {
                resetAllHoverStates();
              }
            }}
            placement="bottomLeft"
          >
            <span>
              {showActiveIcon ? Icons.arrowRightDark : Icons.arrowRightLight}
            </span>
          </Dropdown>
        </span>
      )}
    </div>
  );
};

export default NavBlock;