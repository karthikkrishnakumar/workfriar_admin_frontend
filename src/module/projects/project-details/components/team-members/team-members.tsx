"use client";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import styles from "./team-members.module.scss";
import dayjs from "dayjs";
import useProjectTeamService, {
  TeamMember,
  Dates,
} from "@/module/projects/project-team/services/project-team-service";
import CustomTable, {
  Column,
  RowData,
} from "@/themes/components/custom-table/custom-table";
import StatusDropdown from "@/themes/components/status-dropdown-menu/status-dropdown-menu";
import Icons from "@/themes/images/icons/icons";
import CustomAvatar from "@/themes/components/avatar/avatar";
import DateModal from "../effective-date-modal/effective-date-modal";
// Interface for the props passed to the TeamMembers component
interface TeamMembersProps {
  id: string;
}

const TeamMembers = ({ id }: TeamMembersProps) => {
  const { fetchProjectTeamByProjectId, changeMemberStatus, updateDates } =
    useProjectTeamService();
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [filteredTeamMembers, setFilteredTeamMembers] = useState<RowData[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [ProjectTeamData, setProjectTeamData] = useState<TeamMember | null>(
    null
  );
  const [dates, setDates] = useState<Dates | null>(null);
  // useEffect hook to fetch project data based on the ID when the component mounts

  useEffect(() => {
    fetchDetails();
  }, []);
  const fetchDetails = async () => {
    const value: any = {
      id: id,
    };
    try {
      const response = await fetchProjectTeamByProjectId(value);
      if (response.status) {
        setFilteredTeamMembers(mapMemberData(response.data.teamsMembers));
        setSelectedId(response.data.id);
      }
    } catch (error) {
      message.error("Failed to fetch project details.");
    }
  };

  const handleDateSubmit = async (values: Record<string, any>) => {
    const payload = {
      end_date: dayjs(values?.end_date).format("YYYY-MM-DD"),
      userId: ProjectTeamData?.id,
      projectTeamId: selectedId,
    };
    try {
      const response = await updateDates(payload);
      if (response.status) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      fetchDetails();
    } catch (err) {
      message.error("Failed.");
    }
    setIsDateModalOpen(false); // Close modal after submission
  };

  const handleEditDates = (member: TeamMember) => {
    setProjectTeamData(member);
    setDates(member.dates.period);
    setIsDateModalOpen(true);
  };

  const columns: Column[] = [
    { title: "Team member", key: "name", align: "left", width: 300 },
    { title: "Email id", key: "email", align: "left" },
    {
      title: "Start and end date",
      key: "dates",
      align: "left",
      width: 350,
    },
    { title: "Status", key: "status", align: "left" },
  ];

  // Function to map member data to RowData format for compatibility with the table
  const mapMemberData = (members: TeamMember[]): RowData[] => {
    function handleStatusClick(e: any, member: TeamMember): void {
      throw new Error("Function not implemented.");
    }

    return members.map((member) => ({
      _id: member.id,
      name: (
        <span className={styles.nameCell}>
          <CustomAvatar
            name={member.name}
            size={50}
            src={member.profile_pic || ""}
          />
          {/* Custom avatar */}
          <span className={styles.member}>{member.name}</span>
          {/* Employee name */}
        </span>
      ),
      email: <span className={styles.member}>{member.email}</span>,
      dates: (
        <span className={styles.dates} onClick={() => handleEditDates(member)}>
          <>{member.dates.period}</>
        </span>
      ),
      status: (
        <StatusDropdown
          status={
            member.status
              ? member.status.replace(/\b\w/g, (l) => l.toUpperCase())
              : ""
          }
          menuItems={[
            { key: "Active", label: "Active" },
            // { key: "Inactive", label: "Inactive" },
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
      <CustomTable columns={columns} data={filteredTeamMembers} />
      {isDateModalOpen && (
        <DateModal
          isModalOpen={isDateModalOpen}
          onClose={() => {
            setIsDateModalOpen(false);
          }}
          onSave={handleDateSubmit}
          initialValues={dates}
        />
      )}
    </div>
  );
};

export default TeamMembers;
