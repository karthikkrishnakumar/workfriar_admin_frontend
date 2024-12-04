"use client";
import React, { useState } from "react";
import { Table, Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "./project-team.module.scss";
import dayjs from "dayjs";
import AvatarGroup from "@/themes/components/avatar-group/avatar-group";
import AddProjectTeamModal from "../add-project-team-modal/add-project-team-modal";
import EditProjectTeamModal from "../edit-project-team-modal/edit-project-team-modal";
import { useRouter } from "next/navigation";

/**
 * Interface representing the Team member data structure.
 * @interface TeamMember
 */
interface TeamMember {
  name: string;
  profile_pic?: string | null;
}

/**
 * Interface representing the ProjectTeam data structure.
 * @interface ProjectTeamData
 */
interface ProjectTeamData {
  key: string;
  ProjectLogo: string;
  ProjectName: string;
  start_date: string | dayjs.Dayjs;
  end_date: string | dayjs.Dayjs;
  status: "completed" | "in_progress" | "on_hold" | "cancelled" | "not_started";
  ProjectTeam: TeamMember[];
}

const ProjectTeam: React.FC = () => {
  const data: ProjectTeamData[] = [
    {
      key: "1",
      ProjectLogo: "",
      ProjectName: "Diamond Lease",
      ProjectTeam: [
        {
          name: "Alice",
          profile_pic:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        },
        { name: "Bob", profile_pic: null },
        { name: "Charlie", profile_pic: null },
        { name: "Diana", profile_pic: null },
      ],
      start_date: "11/10/2024",
      end_date: "02/05/2025",
      status: "completed",
    },
    {
      key: "2",
      ProjectLogo: "",
      ProjectName: "Platinum Hire",
      start_date: "15/11/2024",
      end_date: "03/06/2025",
      status: "in_progress",
      ProjectTeam: [
        {
          name: "Alice",
          profile_pic: null,
        },
        {
          name: "Bob",
          profile_pic:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        },
        { name: "Charlie", profile_pic: null },
      ],
    },
  ];

  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProjectTeam, setSelectedProjectTeam] =
    useState<ProjectTeamData | null>(null);
  const [projectTeamData, setProjectTeamData] =
    useState<ProjectTeamData[]>(data);

  /**
   * Redirects to the project details page
   * @param {ProjectData} project - The project to view
   */

  const handleViewProject = (project: ProjectTeamData) => {
    router.push(`/projects/project-details/${project.key}`);
  };

  /**
   * Changes the ProjectTeam status
   * @param {string} key - The key of the ProjectTeam to update
   * @param {string} newStatus - The new status to set
   */
  const handleStatusChange = (
    key: string,
    newStatus: ProjectTeamData["status"]
  ) => {
    setProjectTeamData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, status: newStatus } : item
      )
    );
  };

  /**
   * Opens the edit modal with the selected ProjectTeam's data
   * @param {ProjectTeamData} ProjectTeam - The ProjectTeam to edit
   */
  const handleEditProjectTeam = (ProjectTeam: ProjectTeamData) => {
    setSelectedProjectTeam({
      ...ProjectTeam,
      start_date: dayjs(ProjectTeam.start_date, "DD/MM/YYYY"),
      end_date: dayjs(ProjectTeam.end_date, "DD/MM/YYYY"),
    });
    setIsEditModalOpen(true);
  };

  /**
   * Converts the status value to a readable format
   * @param {string} status - The status value to convert
   * @returns {string} - The formatted status string
   */
  const getStatusText = (status: ProjectTeamData["status"]): string => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  /**
   * Handles the form submission from the EditProjectTeamModal
   * @param {Record<string, any>} values - The updated values for the ProjectTeam
   */
  const handleEditProjectTeamSubmit = (values: Record<string, any>) => {
    console.log("Updated ProjectTeam Details:", values);
    setIsEditModalOpen(false); // Close modal after submission
  };

  /**
   * Handles the form submission from the AddProjectModal
   * @param {Record<string, any>} values - The values for the new project
   */
  const handleAddProjectTeamSubmit = (values: Record<string, any>) => {
    console.log("Updated ProjectTeam Details:", values);
    setIsAddModalOpen(false); // Close modal after submission
  };

  const columns = [
    {
      title: "Project",
      dataIndex: "ProjectName",
      key: "ProjectName",
      width: "30%",
      render: (text: string, record: ProjectTeamData) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {record.ProjectLogo ? (
            <img
              src={record.ProjectLogo}
              alt={record.ProjectName}
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
      title: "Team members",
      dataIndex: "ProjectTeam",
      key: "ProjectTeam",
      width: "25%",
      render: (team: TeamMember[]) => <AvatarGroup team={team} />,
    },
    {
      title: "Start and end date",
      dataIndex: "actual_start_date",
      key: "dates",
      width: "30%",
      render: (_: any, record: ProjectTeamData) => (
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
      render: (status: ProjectTeamData["status"], record: ProjectTeamData) => {
        const menuItems: MenuProps["items"] = [
          { key: "completed", label: getStatusText("completed") },
          { key: "in_progress", label: getStatusText("in_progress") },
          { key: "on_hold", label: getStatusText("on_hold") },
          { key: "cancelled", label: getStatusText("cancelled") },
          { key: "not_started", label: getStatusText("not_started") },
        ];

        const handleMenuClick = (e: { key: string }) => {
          handleStatusChange(record.key, e.key as ProjectTeamData["status"]);
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
    {
      title: "",
      key: "action",
      width: "1%",
      render: (record: ProjectTeamData) => {
        const dynamicActionItems: MenuProps["items"] = [
          {
            key: "view",
            label: <div className={styles.dropdownItem}>Details</div>,
            onClick: () => handleViewProject(record),
          },
          {
            key: "edit",
            label: <div className={styles.dropdownItem}>Edit</div>,
            onClick: () => handleEditProjectTeam(record),
          },
        ];

        return (
          <Dropdown
            menu={{ items: dynamicActionItems }}
            trigger={["click"]}
            placement="bottomRight"
            dropdownRender={(menu) => (
              <div className={styles.dropdownMenu}>{menu}</div>
            )}
          >
            <Button
              type="text"
              icon={
                <MoreOutlined style={{ fontSize: "18px", color: "black" }} />
              }
              className={styles.actionButton}
            />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className={styles.tableWrapper}>
      <Table
        columns={columns}
        dataSource={projectTeamData}
        pagination={false}
        className={styles.table}
      />
      <EditProjectTeamModal
        isEditModalOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditProjectTeamSubmit}
        initialValues={selectedProjectTeam}
      />
      <AddProjectTeamModal
        isAddModalOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddProjectTeamSubmit}
      />
    </div>
  );
};

export default ProjectTeam;
