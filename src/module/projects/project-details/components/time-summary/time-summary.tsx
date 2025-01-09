"use client";
import React, { useEffect, useState } from "react";
import { DatePicker, message } from "antd";
import styles from "./time-summary.module.scss";
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
import DateRangePicker, { DatePickerData } from "@/themes/components/date-picker/date-picker";
import { fetchWeeks } from "@/module/review-timesheet/services/review-timesheet-services";
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
const [weeks, setWeeks] = useState<DatePickerData[]>([]);
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

useEffect(() => {
  // fetch dates
  fetchWeeks(setWeeks);
}, []);

  // useEffect hook to fetch forecast data based on the ID when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      try {
const sDate = formatDate(startDate)   
const eDate = formatDate(endDate)   
        const response = await fetchTimeLoggedByProjectId(id,sDate,
          eDate,
        ); 
        console.log(response);
        if (response.status) {
          setFilteredProjectTeam(mapMemberData(response.data));
        } 
        else {
          setFilteredProjectTeam(mapMemberData([]));
        }
      } catch (error) {
        console.log(error)
        message.error("Failed to fetch project details.");
      }
    };

    fetchDetails();
  }, [startDate, endDate]);

const formatDate=(date:string)=>{
  const [year, month, day] = date.split('-');

  // Pad month and day with leading zeros if needed
  const formattedDate = `${year}-${(month || "0").padStart(2, '0')}-${(day || "0").padStart(2, '0')}`;
  return formattedDate;
}
  


  const handleDateChange = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const columns: Column[] = [
    { title: "Team member", key: "name", align: "left",width:300 },
    {
      title: "Time logged",
      key: "time_logged",
      align: "left",
    },
    { title: "Time approved", key: "time_approved", align: "left" },
    {      title: (
      <div className={styles.datePickerDiv}>
       
        <DateRangePicker weekData={weeks} onDateChange={handleDateChange} />
        
        {/* <DatePicker
                 dropdownClassName={styles.datePickerDropdown}
         suffixIcon={Icons.calender}
         className={styles.datePickerIcon}
         allowClear={false}
         bordered={false}
        //  onChange={( dateString) => {
        //   console.log("Selected Date:", dateString);
        // }}
        /> */}
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
      <CustomAvatar name={member.team_member} size={50} src={member.profile_pic || undefined}/>
      {/* Custom avatar */}
      <span className={styles.member}>{member.team_member}</span>
      {/* Employee name */}
    </span>
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
