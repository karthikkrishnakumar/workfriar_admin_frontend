"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dropdown, Tag, message } from "antd";
import  {MoreOutlined}  from "@ant-design/icons";
import styles from "./project-list.module.scss";
import EditProjectModal from "../edit-project-modal/edit-project-modal";
import AddProjectModal from "../add-project-modal/add-project-modal";
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
  const [filteredProject, setFilteredProject] = useState<RowData[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [effectiveDateModal, setEffectiveDateModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [projectData, setProjectData] = useState<ProjectData[]>([]);

  // useEffect hook to fetch project data based on the ID when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await fetchProjectDetails();
        setProjectData(result.data);
        setFilteredProject(mapProjectData(result.data));
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
          item.id === key
            ? {
                ...item,
                timeEntry:
                  item.open_for_time_entry === "closed" ? "opened" : "closed",
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
        item.id === key ? { ...item, status: newStatus } : item
      )
    );
  };

  /**
   * Opens the edit modal with the selected project's data
   * @param {ProjectData} project - The project to edit
   */
  const handleEditProject = async (project: ProjectData) => {
    setSelectedId(project.id);
    setIsEditModalOpen(true);
  };

  /**
   * Handles the form submission from the EditProjectModal
   * @param {Record<string, any>} values - The updated values for the project
   */
  const handleEditProjectSubmit = async (values: Record<string, any>) => {
    console.log(values)
    try {
      const response = await updateProject(selectedId,values);
      console.log("response",response);
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
    if (row.id) {
      const rowId = row.id;
      router.push(`/projects/project-details/${rowId}`);
    }
  };

  const columns: Column[] = [
    { title: "Projects", key: "projectName", align: "left", width: 250 },
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
    const handleStatusClick = (e: { key: string }, project: ProjectData) => {
      setEffectiveDateModal(true);
      handleStatusChange(project.id, e.key as ProjectData["status"]);
    };
    const handleMenuClick = (e: { key: string }, project: ProjectData) => {
      if (e.key === "Details") {
        if (project.id) {
          router.push(`/projects/project-details/${project.id}`);
        }
      } else if (e.key === "Edit") {
        if (project.id) {
          handleEditProject(project);
        }
      } else if (e.key === "Update-timeEntry") {
        if (project.id) {
          handleTimeEntryChange(project.id);
        }
      }
    };
    return projects.map((project) => ({
      _id: project.id,
      projectName: (
        <span className={styles.nameCell}>
          <CustomAvatar
            name={project.project_name}
            size={50}
            src={project?.project_logo}
          />
          {/* Custom avatar */}
          <span className={styles.project}>{project.project_name}</span>
          {/* Employee name */}
        </span>
      ),
      clientName: <span className={styles.project}>{project.client_name}</span>,
      dates: (
        <span className={styles.project}>
          <>
            {project.actual_start_date && project.actual_end_date
              ? `${project.actual_start_date} - ${project.actual_end_date}`
              : "--"}
          </>
        </span>
      ),
      projectLead: (
        <span className={styles.project}>{project.project_lead}</span>
      ),
      timeEntry: (
        <Tag
          className={`${styles.timeEntryBtn} ${
            styles[project.open_for_time_entry]
          }`}
        >
          {project.open_for_time_entry
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </Tag>
      ),
      status: (
        <StatusDropdown
          status={project.status}
          menuItems={[
            { label: "Not Started", key: "Not Started" },
            { label: "In Progress", key: "In Progress" },
            { label: "On Hold", key: "On Hold" },
            { label: "Cancelled", key: "Cancelled" },
            { label: "Completed", key: "Completed" },
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
                    project.open_for_time_entry === "closed"
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
        onClose={() => {
          setIsEditModalOpen(false);
        }}
        onSave={handleEditProjectSubmit}
        id={selectedId}
        // initialValues={selectedProject}
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
