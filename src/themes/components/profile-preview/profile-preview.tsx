"use client";
import React, { useRef, useState } from "react";
import styles from "./profile.preview.module.scss";
import Image from "next/image";
import Icons from "@/themes/images/icons/icons"; // Icons import
import DropDownModal from "../drop-down-modal/drop-down-modal";
import { useRouter } from "next/navigation"; // Use useRouter from next/navigation
import { ProfileNavigationClass } from "@/utils/navigation-util/profile-navigation-router"; // Import the ProfileNavigationClass

interface ProfilePreviewProps {
  avatarSrc?: string; // Source for the avatar image (optional)
  menuOptions?: string[]; // Array of menu items to display in the dropdown (optional)
  onMenuClick?: (menuItem: string) => void; // Optional callback for menu item clicks
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({
  avatarSrc,
  menuOptions,
  onMenuClick,
}) => {
  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility
  const avatarRef = useRef<HTMLDivElement>(null); // Reference to the avatar container
  const router = useRouter(); // Use useRouter from next/navigation for navigation

  const profileNavigation = new ProfileNavigationClass(); // Create instance of ProfileNavigationClass

  /**
   * Toggles the visibility of the dropdown modal.
   */
  const toggleModal = () => setModalVisible(!isModalVisible);

  /**
   * Handles click on a menu item in the dropdown.
   *
   * @param {string} menuItem - The selected menu item.
   */
  const handleMenuClick = (menuItem: string) => {
    if (onMenuClick) onMenuClick(menuItem); // Trigger callback if provided
    profileNavigation.navigateTo(menuItem, router.push); // Use router.push for navigation
    setModalVisible(false); // Close the modal after menu item click
  };

  return (
    <div className={styles.profilePreviewWrapper} ref={avatarRef}>
      <span className={styles.avatarContainer} onClick={toggleModal}>
        <Image
          src="/dynamic-samples-images/profile.svg" // replace with dynamic image source
          alt="Profile Image"
          width={40}
          height={40}
          className={styles.avatar}
        />
      </span>
      <span
        className={`${styles.menuDropDown} ${
          isModalVisible ? styles.rotateIcon : ""
        }`}
      >
        {Icons.arrowDownFilled}
      </span>

      <DropDownModal
        isVisible={isModalVisible}
        content={
          <ul className={styles.profileNavigationList}>
            {profileNavigation.navigationLinks.map((link) => (
              <li key={link.label} onClick={() => handleMenuClick(link.label)}>
                <span>{Icons[profileNavigation.getIconForLabel(link.label)]}</span> {link.label}
              </li>
            ))}
          </ul>
        }
        theme="black"
        onClose={() => setModalVisible(false)}
        parentRef={avatarRef}
        offsetTop={-10}
        offsetRight={-20}
      />
    </div>
  );
};

export default ProfilePreview;
