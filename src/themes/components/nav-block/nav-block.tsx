import React, { ReactNode, useState, useRef, useEffect } from "react";
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

  const isActive = activeStatus || isDropdownSelected;
  const showActiveIcon = isHovered || isActive || isArrowHovered || isDropdownOpen;

  // Log state changes
  useEffect(() => {
  }, [isHovered, isArrowHovered, isDropdownOpen, showActiveIcon]);

  const menu = (
    <Menu
      className={styles.blackThemeMenu}
      onMouseEnter={() => {
        setIsDropdownOpen(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsDropdownOpen(false);
        setIsHovered(false);
        setIsArrowHovered(false);
      }}
    >
      {dropdownItems?.map((item, index) => (
        <Menu.Item key={index}>
          <div
            onClick={(event) => {
              event.stopPropagation();
              // Execute the item's onClick handler
              item.onClick();
              // Explicitly close the dropdown and reset states
              setIsDropdownOpen(false);
              setIsHovered(false);
              setIsArrowHovered(false);
            }}
          >
            {item.label}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

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
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={(e) => {
        // Check if moving to arrow wrapper or dropdown
        const relatedTarget = e.relatedTarget as Node | null;
        const dropdownMenu = document.querySelector('.ant-dropdown');
        const isLeavingToDropdown = dropdownMenu?.contains(relatedTarget as Node);

        if (!isLeavingToDropdown && !isArrowHovered) {
          setIsHovered(false);
        }
      }}
      onClick={onClickFunction}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onClickFunction?.();
        }
      }}
    >
      <div className={styles.titleAndIcon}>
        {!showActiveIcon && <span className={styles.defaultIcon}>{defaultIcon}</span>}
        {showActiveIcon && <span className={styles.dynamicIcon}>{activeIcon}</span>}
        <h2>{title}</h2>
      </div>
      {collapsible && (
        <span>
          <Dropdown
            overlay={menu}
            trigger={["click", "hover"]}
            className={styles.dropdownStyle}
            overlayStyle={{
              zIndex: 1900,
              position: "fixed",
            }}
            open={isDropdownOpen}
            onOpenChange={(open) => {
              setIsDropdownOpen(open);
              if (!open && !isHovered && !isArrowHovered) {
                setIsHovered(false);
              }
            }}
            placement="bottomLeft"
          >
            <span
              className={styles.arrowWrapper}
              onMouseEnter={() => {
                setIsArrowHovered(true);
                setIsHovered(true);
                setIsDropdownOpen(true);
              }}
              onMouseLeave={(e) => {
                const relatedTarget = e.relatedTarget as Node | null;
                const navBlock = navBlockRef.current;
                const isLeavingToNavBlock = navBlock?.contains(relatedTarget);
                const dropdownMenu = document.querySelector('.ant-dropdown');
                const isLeavingToDropdown = dropdownMenu?.contains(relatedTarget as Node);

                setIsArrowHovered(false);
                if (!isLeavingToNavBlock && !isLeavingToDropdown) {
                  setIsHovered(false);
                  setIsDropdownOpen(false);
                }
              }}
            >
              {showActiveIcon ? Icons.arrowRightDark : Icons.arrowRightLight}
            </span>
          </Dropdown>
        </span>
      )}
    </div>
  );
};

export default NavBlock;