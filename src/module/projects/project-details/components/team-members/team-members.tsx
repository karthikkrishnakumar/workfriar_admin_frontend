"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Dropdown, message } from "antd";
import type { MenuProps } from "antd";
import styles from "./team-members.module.scss";
import dayjs from "dayjs";
import useProjectTeamService, {
  TeamMember,
} from "@/module/projects/project-team/services/project-team-service";

// Interface for the props passed to the TeamMembers component
interface TeamMembersProps {
  id: string;
}

const TeamMembers = ({ id }: TeamMembersProps) => {
  const { fetchProjectTeamByProjectId, changeMemberStatus } =
    useProjectTeamService();
  const [ProjectTeamData, setProjectTeamData] = useState<
    TeamMember[] | undefined
  >(undefined);

  // useEffect hook to fetch project data based on the ID when the component mounts

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await fetchProjectTeamByProjectId(id); // Make sure you pass the ID
        setProjectTeamData(result);
      } catch (error) {
        message.error("Failed to fetch project details.");
      }
    };

    fetchDetails();
  }, []);

  /**
   * Changes the ProjectTeam status
   * @param {string} key - The key of the ProjectTeam to update
   * @param {string} newStatus - The new status to set
   */
  const handleStatusChange = async (
    key: string,
    newStatus: TeamMember["status"]
  ) => {
    setProjectTeamData((prevData = []) =>
      prevData.map((item) =>
        item._id === key ? { ...item, status: newStatus } : item
      )
    );
    try {
      const response = await changeMemberStatus(key);
      console.log(response);
    } catch (err) {
      console.log("Failed.");
    }
  };

  /**
   * Converts the status value to a readable format
   * @param {string} status - The status value to convert
   * @returns {string} - The formatted status string
   */
  const getStatusText = (status: TeamMember["status"]): string => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const columns = [
    {
      title: "Team member",
      dataIndex: "name",
      key: "name",
      width: "30%",
      render: (text: string, record: TeamMember) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {record.profile_pic ? (
            <img
              src={record.profile_pic}
              alt={record.name}
              className={styles.circleImage}
            />
          ) : (
            <div className={styles.circle}>{text.charAt(0).toUpperCase()}</div>
          )}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Email id",
      dataIndex: "email",
      key: "email",
      width: "25%",
    },
    {
      title: "Start and end date",
      dataIndex: "actual_start_date",
      key: "dates",
      width: "30%",
      render: (_: any, record: TeamMember) => (
        <>
          {dayjs.isDayjs(record.start_date)
            ? record.start_date.format("DD/MM/YYYY")
            : record.start_date}{" "}
          -{" "}
          {dayjs.isDayjs(record.end_date)
            ? record.end_date.format("DD/MM/YYYY")
            : record.end_date}
        </>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status: TeamMember["status"], record: TeamMember) => {
        const menuItems: MenuProps["items"] = [
          { key: "completed", label: getStatusText("completed") },
          { key: "in_progress", label: getStatusText("in_progress") },
          { key: "on_hold", label: getStatusText("on_hold") },
          { key: "cancelled", label: getStatusText("cancelled") },
          { key: "not_started", label: getStatusText("not_started") },
        ];

        const handleMenuClick = (e: { key: string }) => {
          handleStatusChange(record._id, e.key as TeamMember["status"]);
        };

        return (
          <Dropdown
            menu={{ items: menuItems, onClick: handleMenuClick }}
            trigger={["click"]}
          >
            <Button type="text" className={styles.statusButton}>
              {getStatusText(status)}
              <span style={{ marginLeft: 0, fontSize: "8px" }}>▼</span>
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className={styles.tableWrapper}>
      <Table
        columns={columns}
        dataSource={ProjectTeamData}
        pagination={false}
        className={styles.table}
      />
    </div>
  );
};

export default TeamMembers;
