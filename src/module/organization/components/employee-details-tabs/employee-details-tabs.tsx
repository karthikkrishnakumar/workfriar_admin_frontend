"use client";

import React, { useState } from "react";
import styles from "./employee-details-tabs.module.scss";
import TabComponent from "@/themes/components/tabs/tabs";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import ButtonComponent from "@/themes/components/button/button";
import EmployeeDetails from "../employee-details/employee-details";
import EmployeeProjects from "../employee-projects/employee-projects";
import AddEditEmployeeModal from "../add-edit-employee-modal/add-edit-employee";

interface EmpoyeeDetailsTabProps {
  id: string;
}

const EmployeeDetailsTabs: React.FC<EmpoyeeDetailsTabProps> = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  setTimeout(() => {
    setLoading(false);
  }, 200);

  const tabs = [
    {
      key: "employee",
      label: <>Employee</>,
      content: <EmployeeDetails employeeId={id} />, // Pass props to ProjectDetails
    },
    {
      key: "employee-projects",
      label: <>Employee Projects</>,
      content: <EmployeeProjects employeeId={id} />, // Pass props to ProjectDetails
    },
  ];

  const handleClickEdit = () => {
    setIsModalVisible(true); // Open the modal when the filter button is clicked
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Close the modal when required
  };

  return (
    <div className={styles.timesheetTabsWrapper}>
      {loading ? (
        <div>
          <SkeletonLoader
            paragraph={{ rows: 2 }}
            classNameItem={styles.customSkeletonItem}
          />
        </div>
      ) : (
        <div>
          <TabComponent
            headings={tabs}
            subHeading={
              <ButtonComponent
                label="Edit User"
                className={styles.mixedGold}
                onClick={handleClickEdit}
                theme="filter"
              />
            }
          />
        </div>
      )}

      {isModalVisible && (
        <AddEditEmployeeModal onClose={handleCloseModal} mode="edit" />
      )}
    </div>
  );
};

export default EmployeeDetailsTabs;
