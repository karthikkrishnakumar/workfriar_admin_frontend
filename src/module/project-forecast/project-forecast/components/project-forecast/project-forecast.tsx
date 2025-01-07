"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dropdown, Tag, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "./project-forecast.module.scss";
import dayjs from "dayjs";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import EditForecastModal from "../edit-forecast-modal/edit-forecast-modal";
import AddForecastModal from "../add-forecast-modal/add-forecast-modal";
import useProjectForecastService, {
  ProjectForecastData,
} from "../../services/project-forecast/project-forecast";
import CustomTable, {
  Column,
  RowData,
} from "@/themes/components/custom-table/custom-table";
import StatusDropdown from "@/themes/components/status-dropdown-menu/status-dropdown-menu";
import Icons from "@/themes/images/icons/icons";

const ProjectForecast: React.FC = () => {
  const router = useRouter();
  const {
    addProjectForecast,
    changeStatus,
    deleteProjectForecast,
    fetchProjectForecastDetails,
    updateProjectForecast,
  } = useProjectForecastService();
  const [effectiveDateModal, setEffectiveDateModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filteredProjectForecast, setFilteredProjectForecast] = useState<
    RowData[]
  >([]);
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
        setProjectForecastData(result.data);
        setFilteredProjectForecast(mapForecastData(result.data));
      } catch (error) {
        message.error("Failed to fetch project details.");
      }
    };

    fetchDetails();
  }, []);

  const handleRowClick = (row: ProjectForecastData) => {
    if (row.id) {
      const rowId = row.id;
      router.push(`/project-forecast/forecast-details/${rowId}`);
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
        item.id === key ? { ...item, status: newStatus } : item
      )
    );
  };

  /**
   * Opens the edit modal with the selected ProjectForecast's data
   * @param {ProjectForecastData} ProjectForecast - The ProjectForecast to edit
   */
  const handleEditProjectForecast = (projectForecast: ProjectForecastData) => {
    // setSelectedProjectForecast({
    //   ...projectForecast,
    //   opportunity_start_date: dayjs(
    //     projectForecast.opportunity_start_date,
    //     "DD/MM/YYYY"
    //   ),
    //   opportunity_close_date: dayjs(
    //     projectForecast.opportunity_close_date,
    //     "DD/MM/YYYY"
    //   ),
    //   expected_project_start_date: dayjs(
    //     projectForecast.expected_start_date,
    //     "DD/MM/YYYY"
    //   ),
    //   expected_end_date: dayjs(projectForecast.expected_end_date, "DD/MM/YYYY"),
    // });
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
  const columns: Column[] = [
    { title: "Oppurtunity name", key: "opportunity_name", align: "left" },
    { title: "Oppurtunity manager", key: "opportunity_manager", align: "left" },
    {
      title: "Opportunity start & close date",
      key: "opportunity_dates",
      align: "left",
      width: 250,
    },
    { title: "Client name", key: "client_name", align: "left" },
    { title: "Oppurtunity stage", key: "opportunity_stage", align: "left" },
    { title: "Status", key: "status", align: "left" },
    { title: "", key: "action", align: "left", width: 40 },
  ];

  // Function to map forecast data to RowData format for compatibility with the table
  const mapForecastData = (forecasts: ProjectForecastData[]): RowData[] => {


    const handleStatusClick = (
      e: { key: string },
      forecast: ProjectForecastData
    ) => {
      setEffectiveDateModal(true);
      handleStatusChange(forecast.id, e.key as ProjectForecastData["status"]);
    };
    const handleMenuClick = (
      e: { key: string },
      forecast: ProjectForecastData
    ) => {
      if (e.key === "Details") {
        if (forecast.id) {
          router.push(`/project-forecast/forecast-details/${forecast.id}`);
        }
      } else if (e.key === "Edit") {
        if (forecast.id) {
          handleEditProjectForecast(forecast);
        }
      } else if (e.key === "Delete") {
        if (forecast.id) {
          handleDeleteProjectForecast(forecast.id);
        }
      }
    };
    return forecasts.map((forecast) => ({
      _id: forecast.id,
      opportunity_name: (
        <span className={styles.forecast}>{forecast.opportunity_name}</span>
      ),
      opportunity_manager: (
        <span className={styles.forecast}>{forecast.opportunity_manager}</span>
      ),
      opportunity_dates: (
        <span className={styles.forecast}>
          <>
          {forecast.opportunity_date}
            {/* {dayjs.isDayjs(forecast.opportunity_start_date)
              ? forecast.opportunity_start_date.format("DD/MM/YYYY")
              : forecast.opportunity_start_date}{" "}
            -{" "}
            {dayjs.isDayjs(forecast.opportunity_close_date)
              ? forecast.opportunity_close_date.format("DD/MM/YYYY")
              : forecast.opportunity_close_date} */}
          </>
        </span>
      ),
      client_name: (
        <span className={styles.forecast}>{forecast.client_name}</span>
      ),
      opportunity_stage: (
        <Tag
          className={`${styles.timeEntryBtn} ${
            styles[forecast.opportunity_stage.replace(/\s/g,'')]
          }`}
        >
          {forecast.opportunity_stage
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </Tag>
      ),
      status: (
        <StatusDropdown
          status={getStatusText(forecast.status)}
          menuItems={[
            { key: "completed", label: getStatusText("completed") },
            { key: "in_progress", label: getStatusText("in_progress") },
            { key: "on_hold", label: getStatusText("on_hold") },
            { key: "cancelled", label: getStatusText("cancelled") },
            { key: "not_started", label: getStatusText("not_started") },
          ]}
          onMenuClick={(e: any) => handleStatusClick(e, forecast)}
          arrowIcon={Icons.arrowDownFilledGold}
          className={styles.status}
        />
      ),
      action: (
        <span className={styles.actionCell}>
          <Dropdown
            menu={{
              items: [
                { key: "Details", label: "Details" },
                { key: "Edit", label: "Edit" },
                { key: "Delete", label: "Delete" },
              ],
              onClick: (e) => handleMenuClick(e, forecast),
            }}
            trigger={["click"]}
          >
            <MoreOutlined className={styles.threeDotButton} />
          </Dropdown>
        </span>
      ),
    }));
  };

  return (
    <div className={styles.tableWrapper}>
      <CustomTable
        columns={columns}
        data={filteredProjectForecast}
        onRowClick={() => handleRowClick}
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
