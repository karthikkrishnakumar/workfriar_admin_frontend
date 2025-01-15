"use client";

import React, { useState, useEffect } from "react";
import styles from "./employee-details-tabs.module.scss";
import TabComponent from "@/themes/components/tabs/tabs";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import ButtonComponent from "@/themes/components/button/button";
import EmployeeDetails from "../employee-details/employee-details";
import EmployeeProjects from "../employee-projects/employee-projects";
import AddEditEmployeeModal from "../add-edit-employee-modal/add-edit-employee";
import UseEmployeeData from "../../services/organization-services/organization-services";
import { EmployeeData } from "@/interfaces/organization/organization";

interface EmpoyeeDetailsTabProps {
  id: string | null;
}

const EmployeeDetailsTabs: React.FC<EmpoyeeDetailsTabProps> = ({ id }) => {
  const [employeeData, setEmployeeData] = useState<EmployeeData>();
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [employeeLoading, setEmployeeLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 200);

  
  const getEmployeeData = async () => {
    try {
      const data = await UseEmployeeData().fetchEmployeeData(id);
      setEmployeeData(data.data);
    } catch (err) {
      setError("Failed to fetch employee details");
    } finally {
      setEmployeeLoading(false);
    }
  };

  useEffect(() => {
    getEmployeeData();
  }, [id]);

  const tabs = [
    {
      key: "employee",
      label: <>Employee</>,
      content: (
        <EmployeeDetails
          employeeData={employeeData}
          loading={employeeLoading}
          error={error}
        />
      ),
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
    getEmployeeData();
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
        <AddEditEmployeeModal
          onClose={handleCloseModal}
          mode="edit"
          employeeData={employeeData}
        />
      )}
    </div>
  );
};

export default EmployeeDetailsTabs;
