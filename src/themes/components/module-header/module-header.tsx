import React, { ReactNode } from "react";
import styles from "./module-header.module.scss";
import Icons from "@/themes/images/icons/icons";
import SearchBar from "../search-bar/search-bar";
import ProfilePreview from "../profile-preview/profile-preview";
import ButtonComponent from "../button/button";

interface ModuleHeaderProps {
  title: string; // Title of the module header
  actionButton?: ActionButtonProps | null;
  isBackButtonNeeded: boolean; // Flag to show or hide the back button
}

interface ActionButtonProps {
  label: string; // Button label
  icon: typeof Icons[keyof typeof Icons];
  onClick: () => void; // Click handler
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
      <div className={styles.leftContainer}>
        {isBackButtonNeeded && (
          <span>{Icons.arrowLeftDark}</span>
        )}
        <h2>{title}</h2>
        <div className={styles.actionbutton}>
          {actionButton && (
            <ButtonComponent
              label={actionButton.label}
              theme="black"
              onClick={actionButton.onClick}
              content={actionButton.icon}
              className={styles.addButton}
            />
          )}
        </div>
      </div>
      
      <div className={styles.rightContainer}>
        <SearchBar placeholder="Search"/>
        <ProfilePreview />
      </div>
    </div>
  );
};

export default ModuleHeader;
