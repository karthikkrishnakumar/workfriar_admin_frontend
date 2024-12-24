"use client";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import styles from "./team-members.module.scss";
import dayjs from "dayjs";
import useProjectTeamService, {
  TeamMember,
} from "@/module/projects/project-team/services/project-team-service";
import CustomTable, {
  Column,
  RowData,
} from "@/themes/components/custom-table/custom-table";
import StatusDropdown from "@/themes/components/status-dropdown-menu/status-dropdown-menu";
import Icons from "@/themes/images/icons/icons";
import CustomAvatar from "@/themes/components/avatar/avatar";
// Interface for the props passed to the TeamMembers component
interface TeamMembersProps {
  id: string;
}

const TeamMembers = ({ id }: TeamMembersProps) => {
  const { fetchProjectTeamByProjectId, changeMemberStatus } =
    useProjectTeamService();
    const [filteredTeamMembers, setFilteredTeamMembers] = useState<
    RowData[]
  >([]);
  const [ProjectTeamData, setProjectTeamData] = useState<
    TeamMember[] | undefined
  >(undefined);

  // useEffect hook to fetch project data based on the ID when the component mounts

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await fetchProjectTeamByProjectId(id); // Make sure you pass the ID
        setProjectTeamData(result);
        setFilteredTeamMembers(mapMemberData(result));
      } catch (error) {
        message.error("Failed to fetch project details.");
      }
    };

    fetchDetails();
  }, []);

  /**
   * Changes the ProjectTeam status
   * @param {string} key - The key of the ProjectTeam to update
   * @param {string} newStatus - The new status to set
   */
  const handleStatusChange = async (
    key: string,
    newStatus: TeamMember["status"]
  ) => {
    setProjectTeamData((prevData = []) =>
      prevData.map((item) =>
        item.id === key ? { ...item, status: newStatus } : item
      )
    );
    try {
      const response = await changeMemberStatus(key);
      console.log(response);
    } catch (err) {
      console.log("Failed.");
    }
  };

  const columns: Column[] = [
    { title: "Team member", key: "name", align: "left",width:300 },
    { title: "Email id", key: "email", align: "left" },
    {
      title: "Start and end date",
      key: "dates",
      align: "left",
      width:350
    },
    { title: "Status", key: "status", align: "left" },
  ];

  // Function to map member data to RowData format for compatibility with the table
  const mapMemberData = (members: TeamMember[]): RowData[] => {


    const handleStatusClick = (
      e: { key: string },
      member: TeamMember
    ) => {
      handleStatusChange(member.id, e.key as TeamMember["status"]);
    };

    return members.map((member) => ({
      _id: member.id,
      name: (
        <span className={styles.nameCell}>
        <CustomAvatar name={member.name} size={50} src={member.profile_pic || undefined}/>
        {/* Custom avatar */}
        <span className={styles.member}>{member.name}</span>
        {/* Employee name */}
      </span>
      ),
      email: (
        <span className={styles.member}>{member.email}</span>
      ),
      dates: (
        <span className={styles.dates}>
          <>
            {dayjs.isDayjs(member.start_date)
              ? member.start_date.format("DD/MM/YYYY")
              : member.start_date}{" "}
            -{" "}
            {dayjs.isDayjs(member.end_date)
              ? member.end_date.format("DD/MM/YYYY")
              : member.end_date}
          </>
        </span>
      ),
      status: (
        <StatusDropdown
          status={member.status || ""}
          menuItems={[
            { key: "Active", label: "Active"},
            { key: "Inactive", label: "Inactive" },
          ]}
          onMenuClick={(e: any) => handleStatusClick(e, member)}
          arrowIcon={Icons.arrowDownFilledGold}
          className={styles.status}
        />
      ),
    }));
  };

  return (
    <div className={styles.tableWrapper}>
       <CustomTable
        columns={columns}
        data={filteredTeamMembers}
      />
    </div>
  );
};

export default TeamMembers;
