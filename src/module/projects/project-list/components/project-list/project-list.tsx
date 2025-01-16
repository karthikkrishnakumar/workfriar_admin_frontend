"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dropdown, Tag, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "./project-list.module.scss";
import ProjectModal from "../add-edit-project-modal/add-edit-project-modal";
import CustomAvatar from "@/themes/components/avatar/avatar";
import StatusDropdown from "@/themes/components/status-dropdown-menu/status-dropdown-menu";
import Icons from "@/themes/images/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeModal } from "@/redux/slices/modalSlice";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import useProjectService from "../../services/project-service";
import CustomTable, {
  Column,
  RowData,
} from "@/themes/components/custom-table/custom-table";
import PaginationComponent from "@/themes/components/pagination-button/pagination-button";
import {
  ProjectData,
  ProjectDisplayData,
} from "@/interfaces/projects/projects";

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
  const [selectedProject, setSelectedProject] =
    useState<ProjectDisplayData | null>(null);
  const [formErrors, setFormErrors] = useState<ProjectData | null>(null);
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((state: RootState) => state.modal);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalRecords, setTotalRecords] = useState(0); // Total records for pagination
  const pageSize = 5; // Number of rows per page

  const fetchDetails = async (page: number) => {
    try {
      const result = await fetchProjectDetails(page, pageSize);
      setFilteredProject(mapProjectData(result.data));
      setTotalRecords(result.total);
    } catch (error) {
      message.error("Failed to fetch project details.");
    }
  };

  // useEffect hook to fetch project data based on the ID when the component mounts
  useEffect(() => {
    fetchDetails(currentPage);
  }, [currentPage, totalRecords]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update the current page
  };
  const handleEffectiveDateSubmit = async (values: Record<string, any>) => {
    const payload = {
      ...values,
      id: selectedProject?.id,
      timeEntry:
        selectedProject?.open_for_time_entry === "closed" ? "opened" : "closed",
    };
    try {
      const response = await changeTimeEntry(payload);
      if (response.status) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      fetchDetails(currentPage);
      setEffectiveDateModal(false);
    } catch (err) {
      message.error("Failed.");
    }
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
    const payload = {
      ...values,
      categories: values.categories.map((cat: any) => cat.id),
      project_logo: values.project_logo,
    };
    try {
      const response = await updateProject(selectedId, payload);
      if (response.status) {
        message.success(response.message);
      } else {
        setFormErrors(response.errors);
        message.error(response.message);
      }
      fetchDetails(currentPage);
    } catch (err) {
      message.error("Failed.");
    }
    setIsEditModalOpen(false); // Close modal after submission
  };

  /**
   * Handles the form submission from the AddProjectModal
   * @param {Record<string, any>} values - The values for the new project
   */

  const handleAddProjectSubmit = async (values: Record<string, any>) => {
    const payload = {
      ...values,
      project_logo: values.project_logo,
    };
    try {
      const response = await addProject(payload);
      if (response.status) {
        message.success(response.message);
      } else {
        setFormErrors(response.errors);
        message.error(response.message);
      }
      fetchDetails(currentPage);
    } catch (err) {
      message.error("Failed.");
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
    const handleStatusChange = async (projectId: string, status: string) => {
      try {
        const payload = { projectId, status };
        const response = await changeStatus(payload);
        if (response.status) {
          message.success(response.message);
        } else {
          message.error(response.errors);
        }
        fetchDetails(currentPage);
      } catch (err) {
        message.error("Failed.");
      }
    };

    const handleStatusClick = (status: string, id: string) => {
      handleStatusChange(id, status);
    };

    const handleTimeEntryClick = (project: ProjectDisplayData) => {
      setEffectiveDateModal(true);
      setSelectedProject(project);
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
          handleTimeEntryClick(project);
        }
      }
    };
    return projects?.map((project) => ({
      _id: project.id,
      projectName: (
        <span className={styles.nameCell}>
          <CustomAvatar
            name={project.project_name}
            size={50}
            src={project?.project_logo}
          />
          {/* Custom avatar */}
          <span
            className={styles.project}
            onClick={() => handleRowClick(project)}
          >
            {project.project_name}
          </span>
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
          onMenuClick={(e: any) => handleStatusClick(e, project.id)}
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
      <div className={styles.paginationDiv}>
        <PaginationComponent
          className={styles.pagination}
          total={totalRecords}
          pageSize={pageSize}
          current={currentPage}
          onChange={handlePageChange}
          showSizeChanger={false}
          loading={false}
        />
      </div>
      {isEditModalOpen && (
        <ProjectModal
          type="edit"
          isModalOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
          onSave={handleEditProjectSubmit}
          id={selectedId}
          formErrors={formErrors}
        />
      )}
      {isOpen && modalType === "addModal" && (
        <ProjectModal
          isModalOpen={true}
          onClose={() => dispatch(closeModal())}
          onSave={handleAddProjectSubmit}
          formErrors={formErrors}
        />
      )}
      <ModalFormComponent
        isVisible={effectiveDateModal}
        title={"Effective date"}
        formRows={[
          {
            fields: [
              {
                name: "closeDate",
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
