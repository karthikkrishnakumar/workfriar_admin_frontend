"use client";
import React, { useEffect, useState } from "react";
import ModalFormComponent, {
  FormRow,
} from "@/themes/components/modal-form/modal-form";
import TabComponent from "@/themes/components/tabs/tabs";
import useProjectForecastService, { ProjectForecastData } from "../../services/project-forecast/project-forecast";
import { ModalProps } from "@/module/projects/project-list/components/add-edit-project-modal/add-edit-project-modal";
import message from "antd/es/message";
import { Member } from "@/module/projects/project-list/services/project-service";
import dayjs from "dayjs";
import useProjectTeamService from "@/module/projects/project-team/services/project-team-service";


const ForecastModal: React.FC<ModalProps> = ({
  isModalOpen,
  onClose,
  onSave,
  id,
  type,
}) => {

  const [selectedForecast, setSelectedForecast] = useState<ProjectForecastData | null>(
    null
  );

  const [opportunityManagers, setOpportunityManagers] = useState<Member[]>([]);
  const [projectManagers, setProjectManagers] = useState<Member[]>([]);
  const [productManagers, setProductManagers] = useState<Member[]>([]);
  const [techLeads, setTechLeads] = useState<Member[]>([]);
  const [accountManagers, setAccountManagers] = useState<Member[]>([]);
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const technical = await useProjectTeamService().fetchTeamMembers("Technical"); 
        setTechLeads(technical.data);
        setTeamMembers(technical.data);
        const management = await useProjectTeamService().fetchTeamMembers("Management"); 
        setOpportunityManagers(management.data);
        setProductManagers(management.data);
        const finance = await useProjectTeamService().fetchTeamMembers("Finance"); 
        setAccountManagers(finance.data);
        const operations = await useProjectTeamService().fetchTeamMembers("Operations"); 
        setProjectManagers(operations.data);
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
          const result = await useProjectForecastService().fetchProjectForecastDetailsById(
            id
          );

          // Format the fetched data
          const formattedResult: ProjectForecastData = {
            ...result.data,
            opportunity_start_date: result.data.opportunity_start_date
              ? dayjs(result.data.opportunity_start_date, "DD/MM/YYYY")
              : null,
              opportunity_close_date: result.data.opportunity_close_date
              ? dayjs(result.data.opportunity_close_date, "DD/MM/YYYY")
              : null,
              expected_project_start_date: result.data.expected_project_start_date
              ? dayjs(result.data.expected_project_start_date, "DD/MM/YYYY")
              : null,
              expected_project_end_date: result.data.expected_project_end_date
              ? dayjs(result.data.expected_project_end_date, "DD/MM/YYYY")
              : null,
            opportunity_manager: result.data.opportunity_manager_id,
            product_manager: result.data.product_manager_id,
            project_manager: result.data.project_manager_id,
            tech_lead: result.data.tech_lead_id,
            account_manager: result.data.account_manager_id,
          };

          setSelectedForecast(formattedResult);
        } catch (error) {
          message.error("Failed to fetch project details.");
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      };

      fetchDetails();
    } else {
      setSelectedForecast(null); // Reset selected project when modal is closed
    }
  }, [isModalOpen, id]);
  const formRowsTab1: FormRow[] = [
    {
      fields: [
        {
          name: "opportunity_name",
          label: "Opportunity name",
          required:true,
          type: "text",
          placeholder:"Enter opportunity name"
        },        {
          name: "opportunity_manager",
          label: "Opportunity Manager",
          required:true,
          placeholder:"Select opportunity manager",
          type: "select",
          options: opportunityManagers.map((member) => ({
            label: member.name,
            value: member.id,
          })),        },
      ],
    },
    {
      fields: [
        {
          name: "opportunity_description",
          label: "Opportunity Description",
          required:true,
          type: "textarea",
          isExtended:true,
          placeholder:"Enter opportunity description"
        },
      ],
    },
    {
      fields: [
        {
          name: "client_name",
          label: "Client name",
          required:true,
          type: "text",
          placeholder:"Enter client name"
        },        {
          name: "billing_model",
          label: "Billing model",
          placeholder:"Select billing model",
          type: "select",
          options: [{ label: "Non billable", value: "Non billable" }],
        },
      ],
    },
    {
      fields: [
        {
          name: "opportunity_start_date",
          label: "Opportunity start date",
          required:true,
          type: "date",
        },        {
          name: "opportunity_close_date",
          label: "Tentative opportunity close date",
          type: "date",
        }, 
      ],
    },
    {
      fields: [
        {
          name: "expected_project_start_date",
          label: "Expected project start date",
          type: "date",
        },        {
          name: "expected_project_end_date",
          label: "Expected project end date",
          type: "date",
        }, 
      ],
    },
    {
      fields: [
        {
          name: "estimated_revenue",
          label: "Estimated revenue",
          type: "text",
          placeholder:"Enter estimated revenue"
        },        {
          name: "opportunity_stage",
          label: "Opportunity stage",
          placeholder:"Select opportunity stage",
          type: "select",
          required:true,
          options: [{ label: "Closed Won", value: "Closed Won" },
            { label: "Closed Lost", value: "Closed Lost" }
          ],
        },
      ],
    },
    {
      fields: [
        {
          name: "expected_resource_breakdown",
          label: "Expected resource breakdown",
          type: "text",
          placeholder:"Enter breakdown"
        },        {
          name: "status",
          label: "Status",
          placeholder:"Select status",
          type: "select",
          required:true,
          options: [{ label: "Completed", value: "Completed" }],
        },
      ],
    },
  ];

  const formRowsTab2: FormRow[] = [
    {
      fields: [
        {
          name: "project_manager",
          label: "Project Manager",
          type: "select",
          placeholder:"Select project manager",
          options: projectManagers.map((member) => ({
            label: member.name,
            value: member.id,
          })),        },        {
          name: "product_manager",
          label: "Product Manager",
          placeholder:"Select product manager",
          type: "select",
          options: productManagers.map((member) => ({
            label: member.name,
            value: member.id,
          })),        },
      ],
    },
    {
      fields: [
        {
          name: "tech_lead",
          label: "Tech lead",
          placeholder:"Select tech lead",
          type: "select",
          options: techLeads.map((member) => ({
            label: member.name,
            value: member.id,
          })),        },        {
          name: "account_manager",
          label: "Account Manager",
          placeholder:"Select account manager",
          type: "select",
          options: accountManagers.map((member) => ({
            label: member.name,
            value: member.id,
          })),
        },
      ],
    },
  ];

  const formRowsTab3: FormRow[] = [
    {
      fields: [
        {
          name: "estimated_project_completion",
          label: "Estimated Project completion % (Per month)",
          type: "text",
          placeholder: "%",
        },
      ],
    },
  ];

  const [activeTabKey, setActiveTabKey] = useState<string>("tab1");

  const formRows =
    activeTabKey === "tab1"
      ? formRowsTab1
      : activeTabKey === "tab2"
      ? formRowsTab2
      : activeTabKey === "tab3"
      ? formRowsTab3
      : [];

  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  // Dynamically setting primary and secondary button labels
  const getButtonLabels = (activeTabKey: string) => {
    if (activeTabKey === "tab1") {
      return { primaryButtonLabel: "Next", secondaryButtonLabel: "Cancel" };
    } else if (activeTabKey === "tab2") {
      return { primaryButtonLabel: "Next", secondaryButtonLabel: "Back" };
    }
    return { primaryButtonLabel: "Save", secondaryButtonLabel: "Back" };
  };

  const { primaryButtonLabel, secondaryButtonLabel } =
    getButtonLabels(activeTabKey);

  // Dynamically changing the button click handlers
  const handlePrimaryClick = () => {
    // Call the appropriate function for each tab, if needed
    if (activeTabKey === "tab1") {
      setActiveTabKey("tab2"); // For Tab 1, save opportunity
    } else if (activeTabKey === "tab2") {
      setActiveTabKey("tab3");
    } else if (activeTabKey === "tab3") {
      onSave(selectedForecast || {}); // For Tab 2, save client info
    }
  };

  const handleSecondaryClick = () => {
    // Handle cancellation for each tab
    if (activeTabKey === "tab1") {
      onClose && onClose();
    } else if (activeTabKey === "tab2") {
      setActiveTabKey("tab1");
    } else if (activeTabKey === "tab3") {
      setActiveTabKey("tab2");
    }
  };
  const headings = [
    {
      key: "tab1",
      label: "Opportunity details",
      content: <div></div>,
    },
    {
      key: "tab2",
      label: "Associated core members",
      content: <div></div>,
    },
    {
      key: "tab3",
      label: "Team forecast",
      content: <div></div>,
    },
  ];
  return (
    <div>
      {/* Tabs component */}

      {/* Modal form with dynamic form rows based on selected tab */}
      {!loading && (
      <ModalFormComponent
        isVisible={isModalOpen}
        title={type === "edit" ? "Edit Project Forecast" : "Add Project Forecast"}
        primaryButtonLabel={primaryButtonLabel}
        secondaryButtonLabel={secondaryButtonLabel}
        onPrimaryClick={handlePrimaryClick}
        onSecondaryClick={handleSecondaryClick}
        onClose={onClose}
        formRows={formRows}
        initialValues={selectedForecast || {}}
        children={
          <TabComponent
            headings={headings}
            onChange={handleTabChange}
            activeKey={activeTabKey}
          />
        }
      />
    )}
    </div>
  );
};

export default ForecastModal;
