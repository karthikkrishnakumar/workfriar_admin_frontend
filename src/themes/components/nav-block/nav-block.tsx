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

  const isActive = activeStatus || isDropdownSelected;
  const showActiveIcon = isHovered || isActive || isArrowHovered;

  const resetAllHoverStates = () => {
    setIsHovered(false);
    setIsArrowHovered(false);
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
        <Menu.Item key={index}>
          <div
            onClick={(event) => {
              event.stopPropagation(); // Prevent triggering the parent's onClick
              item.onClick();
            }}
          >
            {item.label}
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );
  
  

  React.useEffect(() => {
    const handleMouseLeave = (event: Event) => {
      const e = event as MouseEvent;
      const navBlock = navBlockRef.current;
      if (!navBlock) return;

      const relatedTarget = e.relatedTarget as Node | null;
      
      // Check if the mouse is leaving to a child element
      const isLeavingToChild = relatedTarget && navBlock.contains(relatedTarget);
      
      // Check if the mouse is leaving to the dropdown menu
      const dropdownMenu = document.querySelector('.ant-dropdown');
      const isLeavingToDropdown = dropdownMenu?.contains(relatedTarget as Node);

      // Only reset states if we're not leaving to a child element or dropdown
      if (!isLeavingToChild && !isLeavingToDropdown && !isDropdownOpen) {
        resetAllHoverStates();
      }
    };

    // Handle arrow region mouse leave separately
    const handleArrowMouseLeave = (event: Event) => {
      const e = event as MouseEvent;
      const navBlock = navBlockRef.current;
      if (!navBlock) return;

      const relatedTarget = e.relatedTarget as Node | null;
      
      // If leaving arrow region to outside navblock, reset states
      if (!navBlock.contains(relatedTarget)) {
        resetAllHoverStates();
      }
    };

    const navBlock = navBlockRef.current;
    const arrowSpan = navBlock?.querySelector(`.${styles.dropdownSpan}`);

    navBlock?.addEventListener('mouseleave', handleMouseLeave as EventListener);
    arrowSpan?.addEventListener('mouseleave', handleArrowMouseLeave as EventListener);

    return () => {
      navBlock?.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      arrowSpan?.removeEventListener('mouseleave', handleArrowMouseLeave as EventListener);
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
      onMouseLeave={() => {
        if (!isDropdownOpen) {
          setIsHovered(false);
        }
      }}
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
          onMouseLeave={(e: React.MouseEvent) => {
            const navBlock = navBlockRef.current;
            const relatedTarget = e.relatedTarget as Node | null;
            
            // Only reset if leaving to outside the navblock
            if (navBlock && !navBlock.contains(relatedTarget)) {
              resetAllHoverStates();
            }
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