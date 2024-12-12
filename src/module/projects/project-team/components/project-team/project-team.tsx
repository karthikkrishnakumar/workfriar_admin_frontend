"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Dropdown, message } from "antd";
import type { MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "./project-team.module.scss";
import dayjs from "dayjs";
import AvatarGroup from "@/themes/components/avatar-group/avatar-group";
import AddProjectTeamModal from "../add-project-team-modal/add-project-team-modal";
import EditProjectTeamModal from "../edit-project-team-modal/edit-project-team-modal";
import { useRouter } from "next/navigation";
import useProjectTeamService, {
  ProjectTeamData,
  TeamMember,
} from "../../services/project-team-service";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";

const ProjectTeam: React.FC = () => {
  const router = useRouter();
  const {
    addProjectTeam,
    changeStatus,
    fetchProjectTeamDetails,
    updateProjectTeam,
  } = useProjectTeamService();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [effectiveDateModal, setEffectiveDateModal] = useState(false);
  const [selectedProjectTeam, setSelectedProjectTeam] =
    useState<ProjectTeamData | null>(null);
  const [projectTeamData, setProjectTeamData] = useState<ProjectTeamData[]>([]);

  // useEffect hook to fetch forecast data based on the ID when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await fetchProjectTeamDetails(); // Make sure you pass the ID
        setProjectTeamData(result);
      } catch (error) {
        message.error("Failed to fetch project details.");
      }
    };

    fetchDetails();
  }, []);

  const handleEffectiveDateSubmit = async (values: Record<string, any>) => {
    try {
      const response = await changeStatus(values);
      console.log(response);
    } catch (err) {
      console.log("Failed.");
    }
  };

  /**
   * Changes the ProjectTeam status
   * @param {string} key - The key of the ProjectTeam to update
   * @param {string} newStatus - The new status to set
   */
  const handleStatusChange = (
    key: string,
    newStatus: ProjectTeamData["status"]
  ) => {
    setProjectTeamData((prevData) =>
      prevData.map((item) =>
        item._id === key ? { ...item, status: newStatus } : item
      )
    );
  };

  /**
   * Opens the edit modal with the selected ProjectTeam's data
   * @param {ProjectTeamData} ProjectTeam - The ProjectTeam to edit
   */
  const handleEditProjectTeam = (ProjectTeam: ProjectTeamData) => {
    setSelectedProjectTeam({
      ...ProjectTeam,
      start_date: dayjs(ProjectTeam.start_date, "DD/MM/YYYY"),
      end_date: dayjs(ProjectTeam.end_date, "DD/MM/YYYY"),
    });
    setIsEditModalOpen(true);
  };

  /**
   * Converts the status value to a readable format
   * @param {string} status - The status value to convert
   * @returns {string} - The formatted status string
   */
  const getStatusText = (status: ProjectTeamData["status"]): string => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  /**
   * Handles the form submission from the EditProjectTeamModal
   * @param {Record<string, any>} values - The updated values for the ProjectTeam
   */
  const handleEditProjectTeamSubmit = async (values: Record<string, any>) => {
    try {
      const response = await updateProjectTeam(values);
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
  const handleAddProjectTeamSubmit = async (values: Record<string, any>) => {
    try {
      const response = await addProjectTeam(values);
      console.log(response);
    } catch (err) {
      console.log("Failed.");
    }
    setIsAddModalOpen(false); // Close modal after submission
  };

  const columns = [
    {
      title: "Project",
      dataIndex: "ProjectName",
      key: "ProjectName",
      width: "30%",
      render: (text: string, record: ProjectTeamData) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {record.ProjectLogo ? (
            <img
              src={record.ProjectLogo}
              alt={record.ProjectName}
              className={styles.circleImage}
            />
          ) : (
            <div className={styles.circle}>{text.charAt(0).toUpperCase()}</div>
          )}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Team members",
      dataIndex: "ProjectTeam",
      key: "ProjectTeam",
      width: "25%",
      render: (team: TeamMember[]) => <AvatarGroup team={team} />,
    },
    {
      title: "Start and end date",
      dataIndex: "actual_start_date",
      key: "dates",
      width: "30%",
      render: (_: any, record: ProjectTeamData) => (
        <>
          {dayjs.isDayjs(record.start_date)
            ? record.start_date.format("DD/MM/YYYY")
            : record.start_date}{" "}
          -{" "}
          {dayjs.isDayjs(record.end_date)
            ? record.end_date.format("DD/MM/YYYY")
            : record.end_date}
        </>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status: ProjectTeamData["status"], record: ProjectTeamData) => {
        const menuItems: MenuProps["items"] = [
          { key: "completed", label: getStatusText("completed") },
          { key: "in_progress", label: getStatusText("in_progress") },
          { key: "on_hold", label: getStatusText("on_hold") },
          { key: "cancelled", label: getStatusText("cancelled") },
          { key: "not_started", label: getStatusText("not_started") },
        ];

        const handleMenuClick = (e: { key: string }) => {
          setEffectiveDateModal(true);
          handleStatusChange(record._id, e.key as ProjectTeamData["status"]);
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
      render: (record: ProjectTeamData) => {
        const dynamicActionItems: MenuProps["items"] = [
          {
            key: "view",
            label: <div className={styles.dropdownItem}>Details</div>,
            onClick: () =>
              router.push(`/projects/project-details/${record.project_id}`),
          },
          {
            key: "edit",
            label: <div className={styles.dropdownItem}>Edit</div>,
            onClick: () => handleEditProjectTeam(record),
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
        dataSource={projectTeamData}
        pagination={false}
        className={styles.table}
      />
      <EditProjectTeamModal
        isEditModalOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditProjectTeamSubmit}
        initialValues={selectedProjectTeam}
      />
      <AddProjectTeamModal
        isAddModalOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddProjectTeamSubmit}
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

export default ProjectTeam;
