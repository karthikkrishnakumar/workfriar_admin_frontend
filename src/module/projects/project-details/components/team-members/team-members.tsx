"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import styles from "./team-members.module.scss";
import dayjs from "dayjs";

// Interface for the props passed to the TeamMembers component
interface TeamMembersProps {
  id: string;
}

// Interface for the structure of each team member
interface TeamMember {
  key: string;
  name: string;
  profile_pic?: string | null;
  email: string;
  start_date: string | dayjs.Dayjs;
  end_date: string | dayjs.Dayjs;
  status: "completed" | "in_progress" | "on_hold" | "cancelled" | "not_started";
}

const TeamMembers = ({ id }: TeamMembersProps) => {
  const [ProjectTeamData, setProjectTeamData] = useState<
    TeamMember[] | undefined
  >(undefined);

  useEffect(() => {
    if (id) {
      const data: TeamMember[] = [
        {
          key: "1",
          name: "Alice",
          email: "alice@gmail.com",
          profile_pic:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",

          start_date: "11/10/2024",
          end_date: "02/05/2025",
          status: "completed",
        },
        {
          key: "2",
          name: "Bob",
          email: "bob@gmail.com",
          profile_pic:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",

          start_date: "11/10/2024",
          end_date: "02/05/2025",
          status: "completed",
        },
      ];
      setProjectTeamData(data);
    }
  }, [id]);

  /**
   * Changes the ProjectTeam status
   * @param {string} key - The key of the ProjectTeam to update
   * @param {string} newStatus - The new status to set
   */
  const handleStatusChange = (key: string, newStatus: TeamMember["status"]) => {
    setProjectTeamData((prevData = []) =>
      prevData.map((item) =>
        item.key === key ? { ...item, status: newStatus } : item
      )
    );
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
          handleStatusChange(record.key, e.key as TeamMember["status"]);
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
