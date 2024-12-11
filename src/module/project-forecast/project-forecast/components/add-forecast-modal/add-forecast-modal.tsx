"use client";
import React, { useState } from "react";
import ModalFormComponent, {
  FormRow,
} from "@/themes/components/modal-form/modal-form";
import TabComponent from "@/themes/components/tabs/tabs";

export interface AddModalProps {
  isAddModalOpen: boolean;
  onClose?: () => void;
  onSave: (values: Record<string, any>) => void;
}

const AddForecastModal: React.FC<AddModalProps> = ({
  isAddModalOpen,
  onClose,
  onSave,
}) => {

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
          options: [{ label: "Aswina Vinod", value: "Aswina Vinod" }],
        },
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
          name: "project_start_date",
          label: "Expected project start date",
          type: "date",
        },        {
          name: "project_end_date",
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
          options: [{ label: "Aswina Vinod", value: "Aswina Vinod" }],
        },        {
          name: "product_manager",
          label: "Product Manager",
          placeholder:"Select product manager",
          type: "select",
          options: [{ label: "Aswina Vinod", value: "Aswina Vinod" }],
        },
      ],
    },
    {
      fields: [
        {
          name: "tech_lead",
          label: "Tech lead",
          placeholder:"Select tech lead",
          type: "select",
          options: [{ label: "Aswina Vinod", value: "Aswina Vinod" }],
        },        {
          name: "account_manager",
          label: "Account Manager",
          placeholder:"Select account manager",
          type: "select",
          options: [{ label: "Aswina Vinod", value: "Aswina Vinod" }],
        },
      ],
    },
  ];

  const formRowsTab3: FormRow[] = [
    {
      fields: [
        {
          name: "estimated_project",
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
      onSave;
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
      <ModalFormComponent
        isVisible={isAddModalOpen}
        title="Add Project Forecast"
        primaryButtonLabel={primaryButtonLabel}
        secondaryButtonLabel={secondaryButtonLabel}
        onPrimaryClick={handlePrimaryClick}
        onSecondaryClick={handleSecondaryClick}
        onClose={onClose}
        formRows={formRows}
        children={
          <TabComponent
            headings={headings}
            onChange={handleTabChange}
            activeKey={activeTabKey}
          />
        }
      />
    </div>
  );
};

export default AddForecastModal;
