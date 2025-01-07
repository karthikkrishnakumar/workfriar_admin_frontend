"use client";
import React, { useState } from "react";
import styles from "./profile.preview.module.scss";
import Icons from "@/themes/images/icons/icons";
import { useRouter } from "next/navigation";
import { ProfileNavigationClass } from "@/utils/navigation-util/profile-navigation-router";
import LogoutModal from "@/module/dashboard/components/logout-modal/logout-modal";
import DropdownMenu from "../dropdown-menu/dropdown-menu";
import CustomAvatar from "../avatar/avatar";


interface ProfilePreviewProps {
  avatarSrc?: string;
  name?: string;
  onMenuClick?: (menuItem: string) => void;
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({
  avatarSrc,
  name,
  onMenuClick,
}) => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const profileNavigation = new ProfileNavigationClass();

  const handleMenuClick = (menuItem: string) => {
    if (menuItem === "Logout") {
      setLogoutModalVisible(true);
    } else {
      if (onMenuClick) onMenuClick(menuItem);
      profileNavigation.navigateTo(menuItem, router.push);
    }
    setIsDropdownOpen(false); // Close dropdown after click
  };

  const menuItems = profileNavigation.navigationLinks.map(link => ({
    key: link.label,
    label: (
      <div className={styles.menuItem}>
        <span className={styles.icon}>
          {Icons[profileNavigation.getIconForLabel(link.label)]}
        </span>
        <span>{link.label}</span>
      </div>
    ),
    onClick: () => handleMenuClick(link.label)
  }));

  // Create icon component with current state
  const IconComponent = () => (
    <div className={styles.profileTrigger}>
      <div className={styles.avatarWrapper}>
        <CustomAvatar
          src={avatarSrc}
          name={name}
          size={44}
        />
      </div>
      <span className={styles.menuDropDown}>
        {isDropdownOpen ? Icons.arrowUpFilled : Icons.arrowDownFilled}
      </span>
    </div>
  );

  return (
    <div className={styles.profilePreviewWrapper}>
      <DropdownMenu
        menuItems={menuItems}
        trigger={["click"]}
        icon={<IconComponent />}
        wrapperClassName={styles.dropdownWrapper}
        dropdownClassName={styles.profileDropdownMenu}
        minWidth="200px"
      />

      {isLogoutModalVisible && (
        <LogoutModal
          onClose={() => setLogoutModalVisible(false)}
        />
      )}
    </div>
  );
};

export default ProfilePreview;