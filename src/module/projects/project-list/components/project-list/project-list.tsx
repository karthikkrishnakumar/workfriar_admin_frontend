"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Table, Button, Dropdown, Tag } from "antd";
import type { MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "./project-list.module.scss";
import EditProjectModal from "../edit-project-modal/edit-project-modal";
import AddProjectModal from "../add-project-modal/add-project-modal";
import dayjs from "dayjs";

/**
 * Interface representing the project data structure.
 * @interface ProjectData
 */
interface ProjectData {
  key: string;
  projectLogo: string;
  projectName: string;
  clientName: string;
  planned_start_date: string | dayjs.Dayjs;
  planned_end_date: string | dayjs.Dayjs;
  actual_start_date: string | dayjs.Dayjs;
  actual_end_date: string | dayjs.Dayjs;
  projectLead: string;
  projectDescription: string;
  billing_model: string;
  timeEntry: "closed" | "opened";
  status: "completed" | "in_progress" | "on_hold" | "cancelled" | "not_started";
}

const ProjectList: React.FC = () => {
  const data: ProjectData[] = [
    {
      key: "1",
      projectLogo: "",
      projectName: "Diamond Lease",
      clientName: "Techfriar India",
      planned_start_date: "11/10/2024",
      planned_end_date: "02/05/2025",
      actual_start_date: "11/10/2024",
      actual_end_date: "02/05/2025",
      projectLead: "Aswina Vinod",
      timeEntry: "closed",
      status: "completed",
      projectDescription: "",
      billing_model: "Retainer",
    },
    {
      key: "2",
      projectLogo: "",
      projectName: "Platinum Hire",
      clientName: "Techfriar India",
      planned_start_date: "15/11/2024",
      planned_end_date: "03/06/2025",
      actual_start_date: "15/11/2024",
      actual_end_date: "03/06/2025",
      projectLead: "John Doe",
      timeEntry: "opened",
      status: "in_progress",
      projectDescription: "",
      billing_model: "Retainer",
    },
  ];

  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );
  const [projectData, setProjectData] = useState<ProjectData[]>(data);

  /**
   * Toggles the time entry status between "closed" and "opened"
   * @param {string} key - The key of the project to update
   */
  const handleTimeEntryChange = (key: string) => {
    setProjectData((prevData) =>
      prevData.map((item) =>
        item.key === key
          ? {
              ...item,
              timeEntry: item.timeEntry === "closed" ? "opened" : "closed",
            }
          : item
      )
    );
  };

  /**
   * Changes the project status
   * @param {string} key - The key of the project to update
   * @param {string} newStatus - The new status to set
   */
  const handleStatusChange = (
    key: string,
    newStatus: ProjectData["status"]
  ) => {
    setProjectData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, status: newStatus } : item
      )
    );
  };

  /**
   * Opens the edit modal with the selected project's data
   * @param {ProjectData} project - The project to edit
   */
  const handleEditProject = (project: ProjectData) => {
    setSelectedProject({
      ...project,
      planned_start_date: dayjs(project.planned_start_date, "DD/MM/YYYY"),
      planned_end_date: dayjs(project.planned_end_date, "DD/MM/YYYY"),
      actual_start_date: dayjs(project.actual_start_date, "DD/MM/YYYY"),
      actual_end_date: dayjs(project.actual_end_date, "DD/MM/YYYY"),
    });
    setIsEditModalOpen(true);
  };

  /**
   * Redirects to the project details page
   * @param {ProjectData} project - The project to view
   */

  const handleViewProject = (project: ProjectData) => {
    router.push(`/projects/project-details/${project.key}`);
  };

  /**
   * Converts the status value to a readable format
   * @param {string} status - The status value to convert
   * @returns {string} - The formatted status string
   */
  const getStatusText = (status: ProjectData["status"]): string => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  /**
   * Handles the form submission from the EditProjectModal
   * @param {Record<string, any>} values - The updated values for the project
   */
  const handleEditProjectSubmit = (values: Record<string, any>) => {
    console.log("Updated Project Details:", values);
    setIsEditModalOpen(false); // Close modal after submission
  };

  /**
   * Handles the form submission from the AddProjectModal
   * @param {Record<string, any>} values - The values for the new project
   */

  const handleAddProjectSubmit = (values: Record<string, any>) => {
    console.log("Updated Project Details:", values);
    setIsAddModalOpen(false); // Close modal after submission
  };

  const columns = [
    {
      title: "Projects",
      dataIndex: "projectName",
      key: "projectName",
      width: "30%",
      render: (text: string, record: ProjectData) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {record.projectLogo ? (
            <img
              src={record.projectLogo}
              alt={record.projectName}
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
      title: "Client",
      dataIndex: "clientName",
      key: "clientName",
      width: "20%",
    },
    {
      title: "Actual Start & End Date",
      dataIndex: "actual_start_date",
      key: "dates",
      width: "30%",
      render: (_: any, record: ProjectData) => (
        <>
          {dayjs.isDayjs(record.actual_start_date)
            ? record.actual_start_date.format("DD/MM/YYYY")
            : record.actual_start_date}{" "}
          -{" "}
          {dayjs.isDayjs(record.actual_end_date)
            ? record.actual_end_date.format("DD/MM/YYYY")
            : record.actual_end_date}
        </>
      ),
    },
    {
      title: "Project lead",
      dataIndex: "projectLead",
      key: "projectLead",
      width: "25%",
    },
    {
      title: "Time entry",
      dataIndex: "timeEntry",
      key: "timeEntry",
      width: "25%",
      render: (timeEntry: ProjectData["timeEntry"]) => (
        <Tag className={`${styles.timeEntryBtn} ${styles[timeEntry]}`}>
          {timeEntry.charAt(0).toUpperCase() + timeEntry.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status: ProjectData["status"], record: ProjectData) => {
        const menuItems: MenuProps["items"] = [
          { key: "completed", label: getStatusText("completed") },
          { key: "in_progress", label: getStatusText("in_progress") },
          { key: "on_hold", label: getStatusText("on_hold") },
          { key: "cancelled", label: getStatusText("cancelled") },
          { key: "not_started", label: getStatusText("not_started") },
        ];

        const handleMenuClick = (e: { key: string }) => {
          handleStatusChange(record.key, e.key as ProjectData["status"]);
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
      render: (record: ProjectData) => {
        const dynamicActionItems: MenuProps["items"] = [
          {
            key: "view",
            label: <div className={styles.dropdownItem}>Details</div>,
            onClick: () => handleViewProject(record),
          },
          {
            key: "edit",
            label: <div className={styles.dropdownItem}>Edit</div>,
            onClick: () => handleEditProject(record),
          },
          {
            key: "entry",
            label: (
              <div
                className={styles.dropdownItem}
                onClick={() => handleTimeEntryChange(record.key)}
              >
                {record.timeEntry === "closed" ? "Open entry" : "Close entry"}
              </div>
            ),
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
        dataSource={projectData}
        pagination={false}
        className={styles.table}
      />
      <EditProjectModal
        isEditModalOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditProjectSubmit}
        initialValues={selectedProject}
      />
      <AddProjectModal
        isAddModalOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddProjectSubmit}
      />
    </div>
  );
};

export default ProjectList;
