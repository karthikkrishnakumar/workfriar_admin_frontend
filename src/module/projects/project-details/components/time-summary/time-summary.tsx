"use client";
import React, { useEffect, useState } from "react";
import { Table, DatePicker} from "antd";
import styles from "./time-summary.module.scss";
import DateRangePicker from "@/themes/components/date-picker/date-picker";
import Icons from "@/themes/images/icons/icons";

// Interface for the props passed to the TimeSummary component
interface TimeSummaryProps {
  id: string;
}

// Interface of a team member's data
interface TeamMember {
  key: string;
  name: string;
  profile_pic?: string | null;
  email: string;
  time_logged: number;
  time_approved: number;
}

const TimeSummary = ({ id }: TimeSummaryProps) => {
  const [ProjectTeamData, setProjectTeamData] = useState<
    TeamMember[] | undefined
  >(undefined);

  useEffect(() => {
    if (id) {
      const data: TeamMember[] = [
        {
          key: "1",
          name: "Alice",
          email: "alice@gmail.com",
          profile_pic: null,

          time_logged: 10,
          time_approved: 10,
        },
        {
          key: "2",
          name: "Bob",
          email: "bob@gmail.com",
          profile_pic:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",

          time_logged: 10,
          time_approved: 10,
        },
      ];
      setProjectTeamData(data);
    }
  }, [id]);

  const columns = [
    {
      title: "Team member",
      dataIndex: "name",
      key: "name",
      width: "30%",
      render: (text: string, record: TeamMember) => (
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
      render: (_: any, record: TeamMember) => <>{record.time_logged}hrs</>,
    },
    {
      title: "Time approved",
      dataIndex: "time_approved",
      key: "time_approved",
      width: "30%",
      render: (_: any, record: TeamMember) => <>{record.time_approved}hrs</>,
    },
    {
      title: (
        <div className={styles.datePickerDiv}>
          <DateRangePicker
            onDateChange={(startDate: Date, endDate: Date) => {
              console.log("Date range selected:", startDate, endDate);
            }}
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
