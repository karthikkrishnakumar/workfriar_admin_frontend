"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Table, Button, Dropdown, Tag, message } from "antd";
import type { MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "./project-list.module.scss";
import EditProjectModal from "../edit-project-modal/edit-project-modal";
import AddProjectModal from "../add-project-modal/add-project-modal";
import dayjs from "dayjs";
import useProjectService, { ProjectData } from "../../services/project-service";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";

const ProjectList: React.FC = () => {
  const router = useRouter();
  const {
    addProject,
    changeStatus,
    changeTimeEntry,
    fetchProjectDetails,
    updateProject,
  } = useProjectService();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [effectiveDateModal, setEffectiveDateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );
  const [projectData, setProjectData] = useState<ProjectData[]>([]);

  // useEffect hook to fetch forecast data based on the ID when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await fetchProjectDetails(); // Make sure you pass the ID
        setProjectData(result);
      } catch (error) {
        message.error("Failed to fetch project details.");
      }
    };

    fetchDetails();
  }, []);

  /**
   * Toggles the time entry status between "closed" and "opened"
   * @param {string} key - The key of the project to update
   */
  const handleTimeEntryChange = async (key: string) => {
    try {
      setProjectData((prevData) =>
        prevData.map((item) =>
          item._id === key
            ? {
                ...item,
                timeEntry: item.timeEntry === "closed" ? "opened" : "closed",
              }
            : item
        )
      );
      const response = await changeTimeEntry(key);
      console.log(response);
    } catch (err) {
      console.log("Failed.");
    }
  };

  const handleEffectiveDateSubmit = async (values: Record<string, any>) => {
    try {
      const response = await changeStatus(values);
      console.log(response);
    } catch (err) {
      console.log("Failed.");
    }
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
        item._id === key ? { ...item, status: newStatus } : item
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
  const handleEditProjectSubmit = async (values: Record<string, any>) => {
    try {
      const response = await updateProject(values);
      console.log(response);
    } catch (err) {
      console.log("Failed.");
    }
    setIsEditModalOpen(false); // Close modal after submission
  };

  /**
   * Handles the form submission from the AddProjectModal
   * @param {Record<string, any>} values - The values for the new project
   */

  const handleAddProjectSubmit = async (values: Record<string, any>) => {
    try {
      const response = await addProject(values);
      console.log(response);
    } catch (err) {
      console.log("Failed.");
    }
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
          setEffectiveDateModal(true);
          handleStatusChange(record._id, e.key as ProjectData["status"]);
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
            onClick: () =>
              router.push(`/projects/project-details/${record._id}`),
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
                onClick={() => handleTimeEntryChange(record._id)}
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
      <ModalFormComponent
        isVisible={effectiveDateModal}
        title={"Effective date"}
        formRows={[
          {
            fields: [
              {
                name: "effective_date",
                label: "Effective date",
                type: "date",
                required: true,
              },
            ],
          },
        ]}
        primaryButtonLabel={"Save"}
        secondaryButtonLabel={"Cancel"}
        onPrimaryClick={handleEffectiveDateSubmit}
        onSecondaryClick={() => setEffectiveDateModal(false)}
        onClose={() => setEffectiveDateModal(false)}
      />
    </div>
  );
};

export default ProjectList;
