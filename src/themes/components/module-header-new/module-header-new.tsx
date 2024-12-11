import React from "react";
import styles from "./module-header.module.scss";
import Icons from "@/themes/images/icons/icons";
import SearchBar from "../search-bar/search-bar";
import ProfilePreview from "../profile-preview/profile-preview";
import ButtonComponent from "../button/button";

interface ModuleHeaderProps {
  title: string;
  isBackButtonNeeded: boolean;
  isActionButtonNeeded?: boolean;
  openModal?: () => void;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  title,
  isBackButtonNeeded,
  isActionButtonNeeded,
  openModal,
}) => {
  const getButtonDetails = () => {
    if (isActionButtonNeeded) {
      switch (window.location.pathname) {
        case "/time-sheet-report":
          return { label: "Add Report", icon: Icons.plusLight };
        case "/settings":
          return { label: "Add Role", icon: Icons.plusLight };
        default:
          return { label: "Add", icon: Icons.plusLight };
      }
    }
    return { label: "", icon: null };
  };

  const { label, icon } = getButtonDetails(); // Get dynamic button label and icon

  return (
    <div className={styles.moduleHeaderwrpper}>
      <div className={styles.leftContainer}>
        {isBackButtonNeeded && <span>{Icons.arrowLeftDark}</span>}
        <h2>{title}</h2>
        {/* Conditionally render the ActionButton */}
        {isActionButtonNeeded && (
        <ButtonComponent
          label={label}
          theme="black"
          onClick={openModal} // Trigger the modal open
          content={icon}
          className={styles.addButton}
        />
      )}
      </div>
      
      <div className={styles.rightContainer}>
        <SearchBar placeholder="Search" />
        <ProfilePreview />
        
      </div>
    </div>
  );
};

export default ModuleHeader;
