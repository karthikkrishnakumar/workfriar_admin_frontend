"use client";
import React, { useEffect, useState } from "react";
import { DatePicker, message } from "antd";
import styles from "./time-summary.module.scss";
import DateRangePicker from "@/themes/components/date-picker/date-picker";
import Icons from "@/themes/images/icons/icons";
import useProjectTeamService, {
  TimeLogged,
  TimeLoggedResponse,
} from "@/module/projects/project-team/services/project-team-service";
import CustomTable, {
  Column,
  RowData,
} from "@/themes/components/custom-table/custom-table";
import CustomAvatar from "@/themes/components/avatar/avatar";
// Interface for the props passed to the TimeSummary component
interface TimeSummaryProps {
  id: string;
}

const TimeSummary = ({ id }: TimeSummaryProps) => {
  const { fetchTimeLoggedByProjectId } = useProjectTeamService();
  const [ProjectTeamData, setProjectTeamData] = useState<
    TimeLoggedResponse[] | undefined
  >(undefined);
  const [filteredProjectTeam, setFilteredProjectTeam] = useState<
  RowData[]
>([]);
const [currentRange, setCurrentRange] = useState("");
const [prev, setPrev] = useState(false); // New state for prev
const [next, setNext] = useState(false); // New state for next

  // useEffect hook to fetch forecast data based on the ID when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const parts = currentRange.split("-");
        const startDate = parts.slice(0, 3).join("-"); // First part of the range
        const endDate = parts.slice(3, 6).join("-"); // Second part of the range
        const result = await fetchTimeLoggedByProjectId(id,startDate,
          endDate,
          prev,
          next); // Make sure you pass the ID
        setProjectTeamData(result.data);
        setCurrentRange(result.dateRange);
        setFilteredProjectTeam(mapMemberData(result.data));
      } catch (error) {
        message.error("Failed to fetch project details.");
      }
    };

    fetchDetails();
  }, [prev, next]);

  const handleDateChange = (data: {
    startDate: string;
    endDate: string;
    prev: boolean;
    next: boolean;
  }) => {
    setCurrentRange(`${data.startDate}-${data.endDate}`);
    setPrev(data.prev);
    setNext(data.next);
  };

  const columns: Column[] = [
    { title: "Team member", key: "name", align: "left",width:300 },
    { title: "Email id", key: "email", align: "left" },
    {
      title: "Time logged",
      key: "time_logged",
      align: "left",
    },
    { title: "Time approved", key: "time_approved", align: "left" },
    {      title: (
      <div className={styles.datePickerDiv}>
        <DateRangePicker range={currentRange}
              onDateChange={handleDateChange}/>

        <DatePicker
          onChange={(date, dateString) => {
            console.log("Selected Date:", date, dateString);
          }}
          dropdownClassName={styles.datePickerDropdown}
          suffixIcon={Icons.calender}
          className={styles.datePickerIcon}
          allowClear={false}
          bordered={false}
        />
      </div>
    ),
    key: "date",
  },
  ];
 // Function to map member data to RowData format for compatibility with the table
 const mapMemberData = (members: TimeLogged[]): RowData[] => {

  return members.map((member) => ({
    _id: member._id,
    name: (
      <span className={styles.nameCell}>
      <CustomAvatar name={member.team_member} size={50} src={member.profile_pic}/>
      {/* Custom avatar */}
      <span className={styles.member}>{member.team_member}</span>
      {/* Employee name */}
    </span>
    ),
    email: (
      <span className={styles.member}>{member.email}</span>
    ),
    time_logged: (
      <span className={styles.member}>{member.total_time} hrs</span>
    ),
    time_approved: (
      <span className={styles.member}>{member.approved_time} hrs</span>
    ),
    
  }));
};
  return (
    <div className={styles.tableWrapper}>
       <CustomTable
        columns={columns}
        data={filteredProjectTeam}
      />
    </div>
  );
};

export default TimeSummary;
