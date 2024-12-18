"use client";
import React, { useEffect, useState } from "react";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import useProjectListService, {
  ProjectData,
} from "../../services/project-service";
import { message } from "antd";
import dayjs from "dayjs";
import useClientService, { ClientData } from "@/module/projects/client/services/client-service";
import useTaskCategoryService, {TaskCategoryData} from "@/module/projects/task-category/services/task-category-service";


interface EditProjectModalProps {
  isEditModalOpen: boolean;
  onClose?: () => void;
  onSave: (values: Record<string, any>) => void;
  id: string;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isEditModalOpen,
  onClose,
  onSave,
  id,
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );
  const [clientData, setClientData] = useState<ClientData[]>([]);
  const [taskCategoryData, setTaskCategoryData] = useState<TaskCategoryData[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const result = await useClientService().fetchClientDetails(); // Make sure you pass the ID
        setClientData(result.data);
      } catch (error) {
        message.error("Failed to fetch client details.");
      }
    };
    const fetchCategories = async () => {
      try {
        const result = await useTaskCategoryService().fetchTaskCategoryDetails(); // Make sure you pass the ID
        setTaskCategoryData(result.data);
      } catch (error) {
        message.error("Failed to fetch client details.");
      }
    };

    fetchClients();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isEditModalOpen) {
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
              ? dayjs(result.data.planned_start_date)
              : null,
            planned_end_date: result.data.planned_end_date
              ? dayjs(result.data.planned_end_date)
              : null,
            actual_start_date: result.data.actual_start_date
              ? dayjs(result.data.actual_start_date)
              : null,
            actual_end_date: result.data.actual_end_date
              ? dayjs(result.data.actual_end_date)
              : null,
            project_lead: result.data?.project_lead.full_name,
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
  }, [isEditModalOpen, id]);

  return (
    <>
     {console.log(clientData,taskCategoryData)}
      {!loading && selectedProject && (
        <ModalFormComponent
          isVisible={isEditModalOpen}
          onClose={onClose}
          title={"Edit Project"}
          primaryButtonLabel={"Save"}
          secondaryButtonLabel={"Cancel"}
          initialValues={selectedProject}
          onPrimaryClick={onSave}
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
                  name: "category",
                  label: "Task category",
                  type: "checkboxSelect",
                  options: taskCategoryData.map((category) => ({
                    label: category.category, 
                    value: category.id,
                  })),
                },
                {
                  name: "project_lead",
                  label: "Project lead",
                  type: "select",
                  options: [{ label: "Aswina Vinod", value: "aswina_vinod" }],
                  required: true,
                },
                
              ],
            },
            {
              fields: [
                {
                  name: "billing_model",
                  label: "Billing model",
                  type: "select",
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

export default EditProjectModal;
