import React, { ReactNode, useCallback, useEffect, useState } from "react";
import styles from "./module-header.module.scss";
import Icons from "@/themes/images/icons/icons";
import SearchBar from "../search-bar/search-bar";
import ProfilePreview from "../profile-preview/profile-preview";
import ButtonComponent from "../button/button";
import { useRouter } from "next/navigation";
import useProfileService from "@/module/profile/services/profile-service";

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

export interface AvatarData {
  profile_pic_path: string;
  name: string;
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

  const { getAdminDetails } = useProfileService();
  const [avatarData, setAvatarData] = useState<AvatarData | null>(null);
    
  const fetchAvatarData = useCallback(async () => {
    try {
      const response = await getAdminDetails();
      if (response.status) {
        setAvatarData({
          name: response.data.name,
          profile_pic_path: response.data.profile_pic_path
        });
      }
    } catch (error) {
      setAvatarData({
        name: '',
        profile_pic_path: "/dynamic-samples-images/profile.svg"
      });
    }
  }, [getAdminDetails]);

  useEffect(() => {
    fetchAvatarData();
  }, []);


  const router = useRouter(); 
  return (
    <div className={styles.moduleHeaderwrpper}>
      <div className={styles.leftContainer}>
        {isBackButtonNeeded && (
          <span onClick={() => router.back()} className={styles.backButton}>
            {Icons.arrowLeftDark}
          </span>
        )}
        <h2>{title}</h2>
        <div className={styles.actionbutton}>
          {actionButton && (
            <ButtonComponent
              label={actionButton.label}
              theme="black"
              onClick={actionButton.onClick}
              // content={actionButton.icon}
              defaultIcon={actionButton.icon}
              hoverIcon={Icons.plusDark}
              className={styles.addButton}
            />
          )}
        </div>
      </div>
      
      <div className={styles.rightContainer}>
        <SearchBar placeholder="Search" value={""} onChange={function (value: string): void {
          throw new Error("Function not implemented.");
        } }/>
        
        {avatarData && (
          <ProfilePreview
            avatarSrc={avatarData.profile_pic_path}
            name={avatarData.name}
          />
        )}
        
      </div>
    </div>
  );
};

export default ModuleHeader;
