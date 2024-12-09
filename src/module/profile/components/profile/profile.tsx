"use client";
import { useState, useEffect } from "react";
import styles from "./profile.module.scss";
import { Button, Spin } from "antd";
import ProfileCard from "@/themes/components/profile-card/profile-card";
import EditProjectModal from "../edit-profile-modal/edit-profile-modal";

/**
 * Interface representing the Profile data structure.
 * This interface defines the shape of the Profile data.
 * @interface ProfileData
 */
interface ProfileData {
  id: string;
  profile_pic: string;
  name: string;
  email: string;
  location: string;
  phone: string;
  role: string;
  reporting_manager: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const id = "1";

  /**
   * Handles the form submission from the EditProfileModal
   * @param {Record<string, any>} values - The updated values for the Profile
   */
  const handleEditProfileSubmit = (values: Record<string, any>) => {
    console.log("Updated Profile Details:", values);
    setIsEditModalOpen(false); // Close modal after submission
  };
  // useEffect hook to fetch Profile data based on the ID when the component mounts
  useEffect(() => {
    if (id) {
      const ProfileData: ProfileData = {
        id,
        profile_pic: "/logo.svg",
        name: "Amira",
        email: "amira@techfriar.com",
        location: "India",
        phone: "+91 9876543210",
        role: "Jr.Software Developer",
        reporting_manager: "Aswina Vinod",
      };
      setProfile(ProfileData);
    }
  }, [id]);

  if (!profile) {
    return (
      <div className={styles.loadingWrapper}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.profileDetailsWrapper}>
      <div className={styles.topRow}>
        <div className={styles.imageUploadContainer}>
          <div className={styles.imageCircle}>
            {profile.profile_pic ? (
              <img
                src={profile.profile_pic}
                alt="Profile"
                className={styles.image}
              />
            ) : (
              <span className={styles.imageInitial}>
                {profile.name[0].toUpperCase()}
              </span>
            )}
          </div>
        </div>
        <Button onClick={() => setIsEditModalOpen(true)}>Edit profile</Button>
      </div>
      <ProfileCard
        initialValues={profile}
        formRows={[
          {
            fields: [
              {
                name: "name",
                label: "Full name",
                type: "text",
              },
              {
                name: "email",
                label: "Email",
                type: "text",
              },
            ],
          },
          {
            fields: [
              {
                name: "location",
                label: "Location",
                type: "text",
              },
              {
                name: "phone",
                label: "Phone",
                type: "text",
              },
            ],
          },
          {
            fields: [
              {
                name: "role",
                label: "Role",
                type: "text",
              },
              {
                name: "reporting_manager",
                label: "Reporting Manager",
                type: "text",
              },
            ],
          },
        ]}
      />
      <EditProjectModal
        isEditModalOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditProfileSubmit}
        initialValues={profile}
      />
    </div>
  );
};

export default Profile;
