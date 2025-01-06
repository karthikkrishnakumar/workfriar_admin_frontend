"use client";
import React, { useEffect, useState } from "react";
import { Dropdown, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "./project-team.module.scss";
import dayjs from "dayjs";
import AvatarGroup from "@/themes/components/avatar-group/avatar-group";
import ProjectTeamModal from "../add-edit-project-team-modal/add-edit-project-team-modal";
import { useRouter } from "next/navigation";
import useProjectTeamService, {
  ProjectTeamData,
} from "../../services/project-team-service";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import CustomTable, {
  Column,
  RowData,
} from "@/themes/components/custom-table/custom-table";
import StatusDropdown from "@/themes/components/status-dropdown-menu/status-dropdown-menu";
import Icons from "@/themes/images/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeModal } from "@/redux/slices/modalSlice";
import CustomAvatar from "@/themes/components/avatar/avatar";
import TeamMembers from "@/module/projects/project-details/components/team-members/team-members";

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
  const [filteredProjectTeam, setFilteredProjectTeam] = useState<
  RowData[]
>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [effectiveDateModal, setEffectiveDateModal] = useState(false);
  const [selectedProjectTeam, setSelectedProjectTeam] =
    useState<ProjectTeamData | null>(null);
  const [projectTeamData, setProjectTeamData] = useState<ProjectTeamData[]>([]);

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
        item.id === key ? { ...item, status: newStatus } : item
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
      const transformedTeam = values.teamMembers.map((member: any) => ({ userid: member }));
      const payload={
        project:values.projectname,
        team_members:transformedTeam
      }
      const response = await addProjectTeam(payload);
      console.log(response);
      if (response.status) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      fetchDetails();
    } catch (err) {
      console.log("Failed.");
    }
    dispatch(closeModal())
  };

  const handleRowClick = (row: ProjectTeamData) => {
    if (row.id) {
      const rowId = row.project_id;
      router.push(`/projects/project-details/${rowId}`);
    }
  };

  const columns: Column[] = [
    { title: "Project",key: "ProjectName", align: "left" },
    {  title: "Team members", key: "ProjectTeam", align: "left" },
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
    

    const handleStatusClick = (
      e: { key: string },
      team: ProjectTeamData
    ) => {
      setEffectiveDateModal(true);
      handleStatusChange(team.id, e.key as ProjectTeamData["status"]);
    };
    const handleMenuClick = (
      e: { key: string },
      team: ProjectTeamData
    ) => {
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
        <span className={styles.team} onClick={()=>handleRowClick(team)}>{team.projectname}</span>
        {/* Employee name */}
      </span>
      ),
      ProjectTeam: (
        <span>
          <AvatarGroup team={team.teamsMembers}/>
          </span>
      ),
      actual_dates: (
        <span className={styles.dates}>
          <>
            {/* {dayjs.isDayjs(team.start_date)
              ? team.start_date.format("DD/MM/YYYY")
              : team.start_date}{" "}
            -{" "}
            {dayjs.isDayjs(team.end_date)
              ? team.end_date.format("DD/MM/YYYY")
              : team.end_date} */}
              {team.date}
          </>
        </span>
      ),
      status: (
        <StatusDropdown
          status={getStatusText(team.status)}
          menuItems={[
            { key: "completed", label: getStatusText("completed") },
            { key: "in_progress", label: getStatusText("in_progress") },
            { key: "on_hold", label: getStatusText("on_hold") },
            { key: "cancelled", label: getStatusText("cancelled") },
            { key: "not_started", label: getStatusText("not_started") },
          ]}
          onMenuClick={(e: any) => handleStatusClick(e, team)}
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
      initialValues={selectedProjectTeam}
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
