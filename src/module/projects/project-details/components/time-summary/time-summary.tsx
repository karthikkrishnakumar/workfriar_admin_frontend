"use client";
import React, { useEffect, useState } from "react";
import { Table, DatePicker, message } from "antd";
import styles from "./time-summary.module.scss";
import DateRangePicker from "@/themes/components/date-picker/date-picker";
import Icons from "@/themes/images/icons/icons";
import useProjectTeamService, {
  TimeLoggedResponse,
} from "@/module/projects/project-team/services/project-team-service";

// Interface for the props passed to the TimeSummary component
interface TimeSummaryProps {
  id: string;
}

const TimeSummary = ({ id }: TimeSummaryProps) => {
  const { fetchTimeLoggedByProjectId } = useProjectTeamService();
  const [ProjectTeamData, setProjectTeamData] = useState<
    TimeLoggedResponse[] | undefined
  >(undefined);

  // useEffect hook to fetch forecast data based on the ID when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await fetchTimeLoggedByProjectId(id); // Make sure you pass the ID
        setProjectTeamData(result);
      } catch (error) {
        message.error("Failed to fetch project details.");
      }
    };

    fetchDetails();
  }, []);

  const columns = [
    {
      title: "Team member",
      dataIndex: "name",
      key: "name",
      width: "30%",
      render: (text: string, record: TimeLoggedResponse) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {record.profile_pic ? (
            <img
              src={record.profile_pic}
              alt={record.name}
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
      title: "Email id",
      dataIndex: "email",
      key: "email",
      width: "25%",
    },
    {
      title: "Time logged",
      dataIndex: "time_logged",
      key: "time_logged",
      width: "30%",
      render: (_: any, record: TimeLoggedResponse) => (
        <>{record.time_logged}hrs</>
      ),
    },
    {
      title: "Time approved",
      dataIndex: "time_approved",
      key: "time_approved",
      width: "30%",
      render: (_: any, record: TimeLoggedResponse) => (
        <>{record.time_approved}hrs</>
      ),
    },
    {
      title: (
        <div className={styles.datePickerDiv}>
          <DateRangePicker
            onDateChange={(startDate: Date, endDate: Date) => {
              console.log("Date range selected:", startDate, endDate);
            }}
            datePickerData={[]}
          />

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

  return (
    <div className={styles.tableWrapper}>
      <Table
        columns={columns}
        dataSource={ProjectTeamData}
        pagination={false}
        className={styles.table}
      />
    </div>
  );
};

export default TimeSummary;
