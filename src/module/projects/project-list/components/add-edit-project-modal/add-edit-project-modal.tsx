"use client";
import React, { useEffect, useState } from "react";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import useProjectListService, {
  ProjectData,
  ProjectLead,
} from "../../services/project-service";
import { message } from "antd";
import dayjs from "dayjs";
import useClientService, {
  ClientData,
} from "@/module/projects/client/services/client-service";
import useTaskCategoryService, {
  TaskCategoryData,
} from "@/module/projects/task-category/services/task-category-service";

export interface ModalProps {
  isModalOpen: boolean;
  onClose?: () => void;
  onSave: (values: Record<string, any>) => void;
  id?: string;
  type?: string;
  formErrors?: ProjectData | null;
}

const ProjectModal: React.FC<ModalProps> = ({
  isModalOpen,
  onClose,
  onSave,
  id,
  type,
  formErrors,
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );
  const [clientData, setClientData] = useState<ClientData[]>([]);
  const [projectLeads, setProjectLeads] = useState<ProjectLead[]>([]);
  const [taskCategoryData, setTaskCategoryData] = useState<TaskCategoryData[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const clients = await useClientService().fetchClientDetails(); // Make sure you pass the ID
        setClientData(clients.data);
        const categories =
          await useTaskCategoryService().fetchTaskCategoryDetails(); // Make sure you pass the ID
        setTaskCategoryData(categories.data);
        const projectLeads = await useProjectListService().fetchProjectLeads(); // Make sure you pass the ID
        setProjectLeads(projectLeads.data);
      } catch (error) {
        message.error("Failed to fetch details.");
      }
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    if (type == "edit" && id) {
      const fetchDetails = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
          const result = await useProjectListService().fetchProjectDetailsById(
            id
          );

          // Format the fetched data
          const formattedResult: ProjectData = {
            ...result.data,
            planned_start_date: result.data.planned_start_date
              ? dayjs(result.data.planned_start_date, "DD/MM/YYYY")
              : null,
            planned_end_date: result.data.planned_end_date
              ? dayjs(result.data.planned_end_date, "DD/MM/YYYY")
              : null,
            actual_start_date: result.data.actual_start_date
              ? dayjs(result.data.actual_start_date, "DD/MM/YYYY")
              : null,
            actual_end_date: result.data.actual_end_date
              ? dayjs(result.data.actual_end_date, "DD/MM/YYYY")
              : null,
            client_name: result.data.client_name._id,
            client_id: result.data.client_name._id,
            project_lead: result.data.project_lead._id,
          };

          setSelectedProject(formattedResult);
        } catch (error) {
          message.error("Failed to fetch project details.");
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      };

      fetchDetails();
    } else {
      setSelectedProject(null); // Reset selected project when modal is closed
    }
  }, [isModalOpen, id]);

  return (
    <>
      {!loading && (
        <ModalFormComponent
          isVisible={isModalOpen}
          onClose={onClose}
          title={type === "edit" ? "Edit Project" : "Add Project"}
          primaryButtonLabel={"Save"}
          secondaryButtonLabel={"Cancel"}
          initialValues={selectedProject || {}}
          onPrimaryClick={onSave}
          // formErrors={formErrors || {}}
          formRows={[
            {
              fields: [
                {
                  name: "project_logo",
                  label: "Project",
                  type: "image",
                },
              ],
            },
            {
              fields: [
                {
                  name: "project_name",
                  label: "Project",
                  type: "text",
                  required: true,
                  placeholder: "Enter project name",
                },
                {
                  name: "client_name",
                  label: "Client",
                  type: "select",
                  options: clientData.map((client) => ({
                    label: client.client_name,
                    value: client._id,
                  })),
                  required: true,
                  placeholder: "Select client",
                },
              ],
            },
            {
              fields: [
                {
                  name: "description",
                  label: "Project Description",
                  type: "textarea",
                  required: true,
                  isExtended: true,
                  placeholder: "Enter description",
                },
              ],
            },
            {
              fields: [
                {
                  name: "planned_start_date",
                  label: "Planned start date",
                  type: "date",
                  required: true,
                },
                {
                  name: "planned_end_date",
                  label: "Planned end date",
                  type: "date",
                },
              ],
            },
            {
              fields: [
                {
                  name: "actual_start_date",
                  label: "Actual start date",
                  type: "date",
                },
                {
                  name: "actual_end_date",
                  label: "Actual end date",
                  type: "date",
                },
              ],
            },
            {
              fields: [
                {
                  name: "categories",
                  label: "Task category",
                  type: "checkboxSelect",
                  placeholder: "Select categories",
                  options: taskCategoryData.map((category) => ({
                    label: category.category,
                    value: category.id,
                  })),
                },
                {
                  name: "project_lead",
                  label: "Project lead",
                  type: "select",
                  options: projectLeads.map((lead) => ({
                    label: lead.full_name,
                    value: lead._id,
                  })),
                  required: true,
                  placeholder: "Select project lead",
                },
              ],
            },
            {
              fields: [
                {
                  name: "billing_model",
                  label: "Billing model",
                  type: "select",
                  placeholder: "Select billing model",
                  options: [
                    {
                      label: "Bill time (time and materials)",
                      value: "Bill time (time and materials)",
                    },
                    {
                      label: "Bill milestones / Fixed fee",
                      value: "Bill milestones / Fixed fee",
                    },
                    { label: "Retainer", value: "Retainer" },
                    { label: "Non billable", value: "Non billable" },
                  ],
                },
                {
                  name: "open_for_time_entry",
                  label: "Time entry",
                  type: "select",
                  placeholder: "Select time entry",
                  options: [
                    { label: "Opened", value: "opened" },
                    { label: "Closed", value: "closed" },
                  ],
                  required: true,
                },
              ],
            },
            {
              fields: [
                {
                  name: "status",
                  label: "Status",
                  type: "select",
                  placeholder: "Select status",
                  options: [
                    { label: "Not Started", value: "Not Started" },
                    { label: "In Progress", value: "In Progress" },
                    { label: "On Hold", value: "On Hold" },
                    { label: "Cancelled", value: "Cancelled" },
                    { label: "Completed", value: "Completed" },
                  ],
                  required: true,
                },
              ],
            },
          ]}
        />
      )}
    </>
  );
};

export default ProjectModal;
