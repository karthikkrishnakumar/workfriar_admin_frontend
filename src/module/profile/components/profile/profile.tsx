"use client";
import { useState, useEffect } from "react";
import styles from "./profile.module.scss";
import { Button, message, Spin } from "antd";
import ProfileCard from "@/themes/components/profile-card/profile-card";
import EditProjectModal from "../edit-profile-modal/edit-profile-modal";
import useProfileService, { ProfileData } from "../../services/profile-service";

const Profile = () => {
  const { getAdminDetails, updateAdminDetails } = useProfileService();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const id = "1";

  /**
   * Handles the form submission from the EditProfileModal
   * @param {Record<string, any>} values - The updated values for the Profile
   */
  const handleEditProfileSubmit = async (values: Record<string, any>) => {
    try {
      const response = await updateAdminDetails(values);
      console.log(response);
    } catch (err) {
      console.log("Failed.");
    }
    setIsEditModalOpen(false); // Close modal after submission
  };
  // useEffect hook to fetch Profile data based on the ID when the component mounts
  useEffect(() => {
    if (id) {
      const fetchDetails = async () => {
        try {
          const result = await getAdminDetails(); // Make sure you pass the ID
          setProfile(result);
        } catch (error) {
          message.error("Failed to fetch project details.");
        }
      };

      fetchDetails();
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
