"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Table, Button, Dropdown, Tag } from "antd";
import type { MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "./project-forecast.module.scss";
import dayjs from "dayjs";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";

/**
 * Interface representing the ProjectForecast data structure.
 * @interface ProjectForecastData
 */
interface ProjectForecastData {
  key: string;
  oppurtunity_name: string;
  opportunity_manager: string;
  client_name: string;
  opportunity_start_date: string | dayjs.Dayjs;
  opportunity_end_date: string | dayjs.Dayjs;
  opportunity_stage: "closed_won" | "closed_lost";
  status: "completed" | "in_progress" | "on_hold" | "cancelled" | "not_started";
}

const ProjectForecast: React.FC = () => {
  const data: ProjectForecastData[] = [
    {
      key: "1",
      oppurtunity_name: "Diamond Lease",
      client_name: "Techfriar India",
      opportunity_start_date: "11/10/2024",
      opportunity_end_date: "02/05/2025",
      opportunity_manager: "Aswina Vinod",
      opportunity_stage: "closed_won",
      status: "completed",
    },
    {
      key: "2",
      oppurtunity_name: "Diamond Lease",
      client_name: "Techfriar India",
      opportunity_start_date: "11/10/2024",
      opportunity_end_date: "02/05/2025",
      opportunity_manager: "Aswina Vinod",
      opportunity_stage: "closed_lost",
      status: "completed",
    },
  ];

  const router = useRouter();
  const [effectiveDateModal, setEffectiveDateModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProjectForecast, setSelectedProjectForecast] =
    useState<ProjectForecastData | null>(null);
  const [projectForecastData, setProjectForecastData] =
    useState<ProjectForecastData[]>(data);

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
        item.key === key ? { ...item, status: newStatus } : item
      )
    );
  };

  /**
   * Opens the edit modal with the selected ProjectForecast's data
   * @param {ProjectForecastData} ProjectForecast - The ProjectForecast to edit
   */
  const handleEditProjectForecast = (ProjectForecast: ProjectForecastData) => {
    setSelectedProjectForecast({
      ...ProjectForecast,
      // planned_start_date: dayjs(ProjectForecast.planned_start_date, "DD/MM/YYYY"),
      // planned_end_date: dayjs(ProjectForecast.planned_end_date, "DD/MM/YYYY"),
      // actual_start_date: dayjs(ProjectForecast.actual_start_date, "DD/MM/YYYY"),
      // actual_end_date: dayjs(ProjectForecast.actual_end_date, "DD/MM/YYYY"),
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteProjectForecast = (
    ProjectForecast: ProjectForecastData
  ) => {
    setSelectedProjectForecast({
      ...ProjectForecast,
    });
    setIsEditModalOpen(true);
  };

  /**
   * Redirects to the ProjectForecast details page
   * @param {ProjectForecastData} ProjectForecast - The ProjectForecast to view
   */

  const handleViewProjectForecast = (ProjectForecast: ProjectForecastData) => {
    router.push(`/project-forecast/forecast-details/${ProjectForecast.key}`);
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
  const handleEditProjectForecastSubmit = (values: Record<string, any>) => {
    console.log("Updated ProjectForecast Details:", values);
    setIsEditModalOpen(false); // Close modal after submission
  };

  const handleEffectiveDateSubmit = (values: Record<string, any>) => {
    setEffectiveDateModal(false); // Close modal after submission
  };

  /**
   * Handles the form submission from the AddProjectForecastModal
   * @param {Record<string, any>} values - The values for the new ProjectForecast
   */

  const handleAddProjectForecastSubmit = (values: Record<string, any>) => {
    console.log("Updated ProjectForecast Details:", values);
    setIsAddModalOpen(false); // Close modal after submission
  };

  const columns = [
    {
      title: "Oppurtunity name",
      dataIndex: "oppurtunity_name",
      key: "oppurtunity_name",
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
          {dayjs.isDayjs(record.opportunity_end_date)
            ? record.opportunity_end_date.format("DD/MM/YYYY")
            : record.opportunity_end_date}
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
            record.key,
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
            onClick: () => handleViewProjectForecast(record),
          },
          {
            key: "edit",
            label: <div className={styles.dropdownItem}>Edit</div>,
            onClick: () => handleEditProjectForecast(record),
          },
          {
            key: "delete",
            label: <div className={styles.dropdownItem}>Delete</div>,
            onClick: () => handleDeleteProjectForecast(record),
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
      {/* <EditProjectForecastModal
        isEditModalOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditProjectForecastSubmit}
        initialValues={selectedProjectForecast}
      />
      <AddProjectForecastModal
        isAddModalOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddProjectForecastSubmit}
      /> */}
    </div>
  );
};

export default ProjectForecast;
