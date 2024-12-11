"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Table, Button, Dropdown, Tag, message } from "antd";
import type { MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "./project-forecast.module.scss";
import dayjs from "dayjs";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import EditForecastModal from "../edit-forecast-modal/edit-forecast-modal";
import AddForecastModal from "../add-forecast-modal/add-forecast-modal";
import {
  addProjectForecast,
  changeStatus,
  deleteProjectForecast,
  fetchProjectForecastDetails,
  ProjectForecastData,
  updateProjectForecast,
} from "../../services/project-forecast/project-forecast";

const ProjectForecast: React.FC = () => {
  const router = useRouter();
  const [effectiveDateModal, setEffectiveDateModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(true);
  const [selectedProjectForecast, setSelectedProjectForecast] =
    useState<ProjectForecastData | null>(null);
  const [projectForecastData, setProjectForecastData] = useState<
    ProjectForecastData[]
  >([]);

  // useEffect hook to fetch forecast data based on the ID when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await fetchProjectForecastDetails(); // Make sure you pass the ID
        setProjectForecastData(result);
      } catch (error) {
        message.error("Failed to fetch project details.");
      }
    };

    fetchDetails();
  }, []);

  /**
   * Changes the ProjectForecast status
   * @param {string} key - The key of the ProjectForecast to update
   * @param {string} newStatus - The new status to set
   */
  const handleStatusChange = (
    key: string,
    newStatus: ProjectForecastData["status"]
  ) => {
    setProjectForecastData((prevData) =>
      prevData.map((item) =>
        item._id === key ? { ...item, status: newStatus } : item
      )
    );
  };

  /**
   * Opens the edit modal with the selected ProjectForecast's data
   * @param {ProjectForecastData} ProjectForecast - The ProjectForecast to edit
   */
  const handleEditProjectForecast = (projectForecast: ProjectForecastData) => {
    setSelectedProjectForecast({
      ...projectForecast,
      opportunity_start_date: dayjs(projectForecast.opportunity_start_date, "DD/MM/YYYY"),
      opportunity_close_date: dayjs(projectForecast.opportunity_close_date, "DD/MM/YYYY"),
      expected_start_date: dayjs(projectForecast.expected_start_date, "DD/MM/YYYY"),
      expected_end_date: dayjs(projectForecast.expected_end_date, "DD/MM/YYYY"),
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteProjectForecast = async (id: string) => {
    try {
      const response = await deleteProjectForecast(id);
      console.log(response);
    } catch (err) {
      console.log("Failed to log in with Google.");
    }
  };


  /**
   * Converts the status value to a readable format
   * @param {string} status - The status value to convert
   * @returns {string} - The formatted status string
   */
  const getStatusText = (status: ProjectForecastData["status"]): string => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  /**
   * Handles the form submission from the EditProjectForecastModal
   * @param {Record<string, any>} values - The updated values for the ProjectForecast
   */
  const handleEditProjectForecastSubmit = async (
    values: Record<string, any>
  ) => {
    console.log(values);

    try {
      const response = await updateProjectForecast(values);
      console.log(response);
    } catch (err) {
      console.log("Failed.");
    }
    setIsEditModalOpen(false); // Close modal after submission
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
   * Handles the form submission from the AddProjectForecastModal
   * @param {Record<string, any>} values - The values for the new ProjectForecast
   */

  const handleAddProjectForecastSubmit = async (
    values: Record<string, any>
  ) => {
    console.log(values);
    try {
      const response = await addProjectForecast(values);
      console.log(response);
    } catch (err) {
      console.log("Failed.");
    }
    setIsAddModalOpen(false); // Close modal after submission
  };

  const columns = [
    {
      title: "Oppurtunity name",
      dataIndex: "opportunity_name",
      key: "opportunity_name",
      width: "20%",
    },
    {
      title: "Oppurtunity manager",
      dataIndex: "opportunity_manager",
      key: "opportunity_manager",
      width: "20%",
    },
    {
      title: "Opportunity start & close date",
      dataIndex: "opportunity_start_date",
      key: "dates",
      width: "30%",
      render: (_: any, record: ProjectForecastData) => (
        <>
          {dayjs.isDayjs(record.opportunity_start_date)
            ? record.opportunity_start_date.format("DD/MM/YYYY")
            : record.opportunity_start_date}{" "}
          -{" "}
          {dayjs.isDayjs(record.opportunity_close_date)
            ? record.opportunity_close_date.format("DD/MM/YYYY")
            : record.opportunity_close_date}
        </>
      ),
    },
    {
      title: "Client name",
      dataIndex: "client_name",
      key: "client_name",
      width: "20%",
    },
    {
      title: "Oppurtunity stage",
      dataIndex: "opportunity_stage",
      key: "opportunity_stage",
      width: "25%",
      render: (timeEntry: ProjectForecastData["opportunity_stage"]) => (
        <Tag className={`${styles.timeEntryBtn} ${styles[timeEntry]}`}>
          {timeEntry
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (
        status: ProjectForecastData["status"],
        record: ProjectForecastData
      ) => {
        const menuItems: MenuProps["items"] = [
          { key: "completed", label: getStatusText("completed") },
          { key: "in_progress", label: getStatusText("in_progress") },
          { key: "on_hold", label: getStatusText("on_hold") },
          { key: "cancelled", label: getStatusText("cancelled") },
          { key: "not_started", label: getStatusText("not_started") },
        ];

        const handleMenuClick = (e: { key: string }) => {
          setEffectiveDateModal(true);
          handleStatusChange(
            record._id,
            e.key as ProjectForecastData["status"]
          );
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
      render: (record: ProjectForecastData) => {
        const dynamicActionItems: MenuProps["items"] = [
          {
            key: "view",
            label: <div className={styles.dropdownItem}>Details</div>,
            onClick: () => router.push(`/project-forecast/forecast-details/${record._id}`),
          },
          {
            key: "edit",
            label: <div className={styles.dropdownItem}>Edit</div>,
            onClick: () => handleEditProjectForecast(record),
          },
          {
            key: "delete",
            label: <div className={styles.dropdownItem}>Delete</div>,
            onClick: () => handleDeleteProjectForecast(record._id),
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
        dataSource={projectForecastData}
        pagination={false}
        className={styles.table}
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
      <EditForecastModal
        isEditModalOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditProjectForecastSubmit}
        initialValues={selectedProjectForecast}
      />
      <AddForecastModal
        isAddModalOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddProjectForecastSubmit}
      />
    </div>
  );
};

export default ProjectForecast;
