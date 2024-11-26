import React, { ReactNode } from "react";
import styles from "./module-header.module.scss";
import Icons from "@/themes/images/icons/icons";
import SearchBar from "../search-bar/search-bar";
import ProfilePreview from "../profile-preview/profile-preview";

interface ModuleHeaderProps {
  title: string; // Title of the module header
  actionButton?: ReactNode; // Optional action button to be displayed (if any)
  isBackButtonNeeded: boolean; // Flag to show or hide the back button
}

/**
 * A reusable header component for modules, featuring a title, optional back button,
 * search bar, and profile preview.
 *
 * @param {ModuleHeaderProps} props - Props passed to the component.
 * @returns {JSX.Element} The rendered ModuleHeader component.
 */
const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  title,
  actionButton,
  isBackButtonNeeded,
}) => {
  return (
    <div className={styles.moduleHeaderwrpper}>
      <div className={styles.rightContainer}>
        {isBackButtonNeeded && (
          <span>{Icons.arrowLeftDark}</span>
        )}
        <h2>{title}</h2>
      </div>

      <div className={styles.leftContainer}>
        <SearchBar placeholder="Search" />
        <ProfilePreview />
      </div>
    </div>
  );
};

export default ModuleHeader;
