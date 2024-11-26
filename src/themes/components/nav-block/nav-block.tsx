"use client";

import React, { ReactNode, useState } from "react";
import classNames from "classnames"; // Utility for conditional classnames
import styles from "./nav-block.module.scss";
import Icons from "@/themes/images/icons/icons";

interface NavBlockProps {
  title: string;  // Title of block
  activeStatus: boolean; // Active status of the block
  defaultIcon: ReactNode; // Default icon for the block
  activeIcon: ReactNode;  // Icon while active
  collapsible: boolean;  // Whether the block is collaps
  onClickFunction?: () => void;  // function for onclick
}

/**
 * A reusable navigation block component that displays icons, titles, and supports hover and active states.
 *
 * @param {NavBlockProps} props - Props passed to the component.
 * @returns {JSX.Element} The rendered NavBlock component.
 */
const NavBlock: React.FC<NavBlockProps> = ({
  title,
  activeStatus,
  defaultIcon,
  activeIcon,
  collapsible,
  onClickFunction,
}) => {
  const [isHovered, setIsHovered] = useState(false); // Tracks hover state

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      onClickFunction?.();
    }
  };

  return (
    <div
      className={classNames(styles.navBlockWrapper, {
        [styles.active]: activeStatus,
      })}
      role="button" // Indicate it's interactive
      tabIndex={0} // Make it focusable
      aria-pressed={activeStatus} // Provide accessible information about active state
      onMouseEnter={() => setIsHovered(true)} // Sets hover state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Resets hover state on mouse leave
      onClick={onClickFunction} // Handles click events
      onKeyDown={handleKeyPress} // Handle keyboard interaction
    >
      <div className={styles.titleAndIcon}>
        <span>{isHovered || activeStatus ? activeIcon : defaultIcon}</span>
        <h3>{title}</h3>
      </div>
      <span>
        {collapsible
          ? isHovered || activeStatus
            ? Icons.arrowRightDark
            : Icons.arrowRightLight
          : ""}
      </span>
    </div>
  );
};

export default NavBlock;
