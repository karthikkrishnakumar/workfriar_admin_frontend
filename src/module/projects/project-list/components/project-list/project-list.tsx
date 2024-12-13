"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dropdown, Tag, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "./project-list.module.scss";
import EditProjectModal from "../edit-project-modal/edit-project-modal";
import AddProjectModal from "../add-project-modal/add-project-modal";
import dayjs from "dayjs";
import useProjectService, { ProjectData } from "../../services/project-service";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import CustomTable, {
  Column,
  RowData,
} from "@/themes/components/custom-table/custom-table";
import CustomAvatar from "@/themes/components/avatar/avatar";
import StatusDropdown from "@/themes/components/status-dropdown-menu/status-dropdown-menu";
import Icons from "@/themes/images/icons/icons";
const ProjectList: React.FC = () => {
  const router = useRouter();
  const {
    addProject,
    changeStatus,
    changeTimeEntry,
    fetchProjectDetails,
    updateProject,
  } = useProjectService();
  const [filteredProject, setFilteredProject] = useState<
  RowData[]
>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [effectiveDateModal, setEffectiveDateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );
  const [projectData, setProjectData] = useState<ProjectData[]>([]);

  // useEffect hook to fetch project data based on the ID when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await fetchProjectDetails(); // Make sure you pass the ID
        setProjectData(result);
        setFilteredProject(mapProjectData(result));
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
      setProjectData((prevData) => {
        const updatedData = prevData.map((item) =>
          item._id === key
            ? {
                ...item,
                timeEntry: item.timeEntry === "closed" ? "opened" : "closed",
              }
            : item
        );
        setFilteredProject(mapProjectData(updatedData)); // Re-map to RowData format
        return updatedData;
      });
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

  const handleRowClick = (row: ProjectData) => {
    if (row._id) {
      const rowId = row._id;
      router.push(`/projects/project-details/${rowId}`);
    }
  };


  const columns: Column[] = [
    { title: "Projects", key: "projectName", align: "left",width: 250, },
    { title: "Client", key: "clientName", align: "left" },
    {
      title: "Actual Start & End Date",
      key: "dates",
      align: "left",
      width: 250,
    },
    { title: "Project lead", key: "projectLead", align: "left" },
    { title: "Time entry", key: "timeEntry", align: "left" },
    { title: "Status", key: "status", align: "left" },
    { title: "", key: "action", align: "left", width: 40 },
  ];

    // Function to map project data to RowData format for compatibility with the table
    const mapProjectData = (projects: ProjectData[]): RowData[] => {


      const handleStatusClick = (
        e: { key: string },
        project: ProjectData
      ) => {
        setEffectiveDateModal(true);
        handleStatusChange(project._id, e.key as ProjectData["status"]);
      };
      const handleMenuClick = (
        e: { key: string },
        project: ProjectData
      ) => {
        if (e.key === "Details") {
          if (project._id) {
            router.push(`/projects/project-details/${project._id}`);
          }
        } else if (e.key === "Edit") {
          if (project._id) {
            handleEditProject(project);
          }
        }
        else if (e.key === "Update-timeEntry") {
          if (project._id) {
            handleTimeEntryChange(project._id);
          }
        }
      };
      return projects.map((project) => ({
        _id: project._id,
        projectName: (
          <span className={styles.nameCell}>
        <CustomAvatar name={project.projectName} size={50} src={project.projectLogo}/>
        {/* Custom avatar */}
        <span className={styles.project}>{project.projectName}</span>
        {/* Employee name */}
      </span>
        ),
        clientName: (
          <span className={styles.project}>{project.clientName}</span>
        ),
        dates: (
          <span className={styles.project}>
            <>
              {dayjs.isDayjs(project.actual_start_date)
                ? project.actual_start_date.format("DD/MM/YYYY")
                : project.actual_start_date}{" "}
              -{" "}
              {dayjs.isDayjs(project.actual_end_date)
                ? project.actual_end_date.format("DD/MM/YYYY")
                : project.actual_end_date}
            </>
          </span>
        ),
        projectLead: (
          <span className={styles.project}>{project.projectLead}</span>
        ),
        timeEntry: (
          <Tag
            className={`${styles.timeEntryBtn} ${
              styles[project.timeEntry]
            }`}
          >
            {project.timeEntry
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </Tag>
        ),
        status: (
          <StatusDropdown
            status={getStatusText(project.status)}
            menuItems={[
              { key: "completed", label: getStatusText("completed") },
              { key: "in_progress", label: getStatusText("in_progress") },
              { key: "on_hold", label: getStatusText("on_hold") },
              { key: "cancelled", label: getStatusText("cancelled") },
              { key: "not_started", label: getStatusText("not_started") },
            ]}
            onMenuClick={(e: any) => handleStatusClick(e, project)}
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
                  {
                    key: "Update-timeEntry",
                    label:
                      project.timeEntry === "closed"
                        ? "Open entry"
                        : "Close entry",
                  },
                ],
                onClick: (e) => handleMenuClick(e, project),
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
        data={filteredProject}
        onRowClick={() => handleRowClick}
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
