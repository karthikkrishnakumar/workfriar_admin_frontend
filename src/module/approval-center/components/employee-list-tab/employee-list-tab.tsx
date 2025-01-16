"use client";
import React, { useEffect, useState } from "react";
import styles from "./employee-list-tab.module.scss";
import TabComponent from "@/themes/components/tabs/tabs";
import EmployeeList from "./employee-list/employee-list";
import { TeamMember } from "@/interfaces/approval-center/approval-center";
import UseApprovalCenterServices from "../../services/all-time-sheet-services";

const EmployeeListTab = () => {
  const [employeeList, setEmployeeList] = useState<TeamMember[]>([]);
  const [loading,setLoading] = useState<boolean>(true);

  const fetchTeamMembers = async() => {
    const response = await UseApprovalCenterServices().fetchTeamMembers();
    setLoading(false);
    setEmployeeList(response.data);
  }
  useEffect(() => {
    fetchTeamMembers();
  }, []);
  const tabs = [
    {
      key: "1",
      label: <>Team members</>,
      content: <EmployeeList employeeList={employeeList} loading={loading}/>,
    },
  ];
  return (
    <div className={styles.listTabWrapper}>
      <TabComponent headings={tabs} />
    </div>
  );
};

export default EmployeeListTab;
