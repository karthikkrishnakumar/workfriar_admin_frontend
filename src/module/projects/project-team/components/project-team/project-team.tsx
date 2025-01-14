"use client";
import React, { useEffect, useState } from "react";
import { Dropdown, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "./project-team.module.scss";
import AvatarGroup from "@/themes/components/avatar-group/avatar-group";
import ProjectTeamModal from "../add-edit-project-team-modal/add-edit-project-team-modal";
import { useRouter } from "next/navigation";
import useProjectTeamService from "../../services/project-team-service";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import StatusDropdown from "@/themes/components/status-dropdown-menu/status-dropdown-menu";
import Icons from "@/themes/images/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeModal } from "@/redux/slices/modalSlice";
import CustomAvatar from "@/themes/components/avatar/avatar";
import { ProjectTeamData } from "@/interfaces/project-team/project-team";
import CustomTable, {
  Column,
  RowData,
} from "@/themes/components/custom-table/custom-table";

const ProjectTeam: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((state: RootState) => state.modal);
  const {
    addProjectTeam,
    changeStatus,
    fetchProjectTeamDetails,
    updateProjectTeam,
  } = useProjectTeamService();
  const [filteredProjectTeam, setFilteredProjectTeam] = useState<RowData[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [effectiveDateModal, setEffectiveDateModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedProjectTeam, setSelectedProjectTeam] =
    useState<ProjectTeamData | null>(null);

  // useEffect hook to fetch team data based on the ID when the component mounts
  useEffect(() => {
    fetchDetails();
  }, []);
  const fetchDetails = async () => {
    try {
      const result = await fetchProjectTeamDetails();
      setFilteredProjectTeam(mapProjectTeamData(result.data));
    } catch (error) {
      message.error("Failed to fetch project details.");
    }
  };

  const handleEffectiveDateSubmit = async (values: Record<string, any>) => {
    try {
      const response = await changeStatus(values);
    } catch (err) {
      message.error("Failed.");
    }
  };

  /**
   * Opens the edit modal with the selected ProjectTeam's data
   * @param {ProjectTeamData} ProjectTeam - The ProjectTeam to edit
   */
  const handleEditProjectTeam = (ProjectTeam: any) => {
    setSelectedProjectTeam({
      ...ProjectTeam,
      teamMembers: ProjectTeam.teamsMembers,
    });
    setSelectedId(ProjectTeam.id);
    setIsEditModalOpen(true);
  };

  /**
   * Handles the form submission from the EditProjectTeamModal
   * @param {Record<string, any>} values - The updated values for the ProjectTeam
   */
  const handleEditProjectTeamSubmit = async (values: Record<string, any>) => {
    try {
      const transformedTeam = values.teamMembers.map((member: any) => ({
        userid: member.id,
      }));
      const payload = {
        id: selectedId,
        project: values.project_id,
        team_members: transformedTeam,
      };
      const response = await updateProjectTeam(payload);
      if (response.status) {
        message.success(response.message);
      } else {
        message.error(response.errors);
      }
      fetchDetails();
    } catch (err) {
      message.error("Failed.");
    }
    setIsEditModalOpen(false); // Close modal after submission
  };

  /**
   * Handles the form submission from the AddProjectModal
   * @param {Record<string, any>} values - The values for the new project
   */
  const handleAddProjectTeamSubmit = async (values: Record<string, any>) => {
    try {
      const transformedTeam = values.teamMembers.map((member: any) => ({
        userid: member,
      }));
      const payload = {
        project: values.project_id,
        team_members: transformedTeam,
      };
      const response = await addProjectTeam(payload);
      if (response.status) {
        message.success(response.message);
      } else {
        message.error(response.errors);
      }
      fetchDetails();
    } catch (err) {
      message.error("Failed.");
    }
    dispatch(closeModal());
  };

  const handleRowClick = (row: ProjectTeamData) => {
    if (row.id) {
      const rowId = row.project_id;
      router.push(`/projects/project-details/${rowId}`);
    }
  };

  const columns: Column[] = [
    { title: "Project", key: "ProjectName", align: "left" },
    { title: "Team members", key: "ProjectTeam", align: "left" },
    {
      title: "Start and end date",
      key: "actual_dates",
      align: "left",
      width: 350,
    },
    { title: "Status", key: "status", align: "left" },
    { title: "", key: "action", align: "left", width: 40 },
  ];

  // Function to map team data to RowData format for compatibility with the table
  const mapProjectTeamData = (teams: ProjectTeamData[]): RowData[] => {
    const handleMenuClick = (e: { key: string }, team: ProjectTeamData) => {
      if (e.key === "Details") {
        if (team.id) {
          router.push(`/projects/project-details/${team.project_id}`);
        }
      } else if (e.key === "Edit") {
        if (team.id) {
          handleEditProjectTeam(team);
        }
      }
    };
    return teams?.map((team) => ({
      _id: team.id,
      ProjectName: (
        <span className={styles.nameCell}>
          <CustomAvatar
            name={team.projectname}
            size={50}
            src={team?.projectlogo}
          />
          {/* Custom avatar */}
          <span className={styles.team} onClick={() => handleRowClick(team)}>
            {team.projectname}
          </span>
          {/* Employee name */}
        </span>
      ),
      ProjectTeam: (
        <span>
          <AvatarGroup team={team.teamsMembers} />
        </span>
      ),
      actual_dates: (
        <span className={styles.dates}>
          <>{team.date}</>
        </span>
      ),
      status: (
        <span className={styles.status}>
          <>{team.status}</>
        </span>
      ),
      action: (
        <span className={styles.actionCell}>
          <Dropdown
            menu={{
              items: [
                { key: "Details", label: "Details" },
                { key: "Edit", label: "Edit" },
              ],
              onClick: (e) => handleMenuClick(e, team),
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
        data={filteredProjectTeam}
        onRowClick={() => handleRowClick}
      />
      {isEditModalOpen && (
        <ProjectTeamModal
          isModalOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditProjectTeamSubmit}
          initialValues={selectedProjectTeam || undefined}
          type="edit"
        />
      )}

      {isOpen && modalType === "addModal" && (
        <ProjectTeamModal
          isModalOpen={true}
          onClose={() => dispatch(closeModal())}
          onSave={handleAddProjectTeamSubmit}
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

export default ProjectTeam;
