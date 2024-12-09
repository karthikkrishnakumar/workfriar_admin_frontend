"use client";
import React, { useEffect, useState } from "react";
import styles from "./employee-list-tab.module.scss";
import TabComponent from "@/themes/components/tabs/tabs";
import {
  fetchTeamMembers,
  TeamMember,
} from "../../services/all-time-sheet-services";
import EmployeeList from "./employee-list/employee-list";

const EmployeeListTab = () => {
  const [employeeList, setEmployeeList] = useState<TeamMember[]>([]);
  useEffect(() => {
    fetchTeamMembers(setEmployeeList);
  }, []);
  const tabs = [
    {
      key: "1",
      label: <>Team members</>,
      content: <EmployeeList employeeList={employeeList} />,
    },
  ];
  return (
    <div className={styles.listTabWrapper}>
      <TabComponent headings={tabs} />
    </div>
  );
};

export default EmployeeListTab;
