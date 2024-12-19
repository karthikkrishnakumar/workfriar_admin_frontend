"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dropdown, Tag, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "./project-list.module.scss";
import ProjectModal from "../add-edit-project-modal/add-edit-project-modal";
import useProjectService, {
  ProjectDisplayData,
} from "../../services/project-service";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import CustomTable, {
  Column,
  RowData,
} from "@/themes/components/custom-table/custom-table";
import CustomAvatar from "@/themes/components/avatar/avatar";
import StatusDropdown from "@/themes/components/status-dropdown-menu/status-dropdown-menu";
import Icons from "@/themes/images/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeModal } from "@/redux/slices/modalSlice";
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
  const [effectiveDateModal, setEffectiveDateModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [projectData, setProjectData] = useState<ProjectDisplayData[]>([]);
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((state: RootState) => state.modal);

  // useEffect hook to fetch project data based on the ID when the component mounts
  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const result = await fetchProjectDetails();
      setProjectData(result.data);
      setFilteredProject(mapProjectData(result.data));
    } catch (error) {
      message.error("Failed to fetch project details.");
    }
  };

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
    newStatus: ProjectDisplayData["status"]
  ) => {
    setProjectData((prevData) =>
      prevData.map((item) =>
        item.id === key ? { ...item, status: newStatus } : item
      )
    );
  };

  /**
   * Opens the edit modal with the selected project's data
   * @param {ProjectDisplayData} project - The project to edit
   */
  const handleEditProject = async (project: ProjectDisplayData) => {
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
      fetchDetails();
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
      // const payload = {
      //   ...values,
      //   project_logo:''
      // }
      const response = await addProject(values);
      console.log(response);
      fetchDetails();
    } catch (err) {
      console.log("Failed.");
    }
    dispatch(closeModal());
  };

  const handleRowClick = (row: ProjectDisplayData) => {
    if (row.id) {
      const rowId = row.id;
      router.push(`/projects/project-details/${rowId}`);
    }
  };

  const columns: Column[] = [
    { title: "Projects", key: "projectName", align: "left", width: 200 },
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
    { title: "", key: "action", align: "left", width: 30 },
  ];

  // Function to map project data to RowData format for compatibility with the table
  const mapProjectData = (projects: ProjectDisplayData[]): RowData[] => {
    const handleStatusClick = (
      e: { key: string },
      project: ProjectDisplayData
    ) => {
      setEffectiveDateModal(true);
      handleStatusChange(project.id, e.key as ProjectDisplayData["status"]);
    };
    const handleMenuClick = (
      e: { key: string },
      project: ProjectDisplayData
    ) => {
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
            { label: "Not started", key: "Not Started" },
            { label: "In progress", key: "In Progress" },
            { label: "On hold", key: "On Hold" },
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
      {isEditModalOpen && (
        <ProjectModal
        type="edit"
          isModalOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
          onSave={handleEditProjectSubmit}
          id={selectedId}
          // initialValues={selectedProject}
        />
      )}
      {isOpen && modalType === "addProjectModal" && (
        <ProjectModal
          isModalOpen={true}
          onClose={() => dispatch(closeModal())}
          onSave={handleAddProjectSubmit}
        />
      )}
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
