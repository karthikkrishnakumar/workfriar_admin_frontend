"use client";
import React, { useEffect, useState } from "react";
import styles from "./approved-overdue-table.module.scss";
import CustomTable from "@/themes/components/custom-table/custom-table";
import { fetchPastDueWeeks, OverViewTable } from "../../services/time-sheet-services";



interface ApprovedOverviewProps {
  tableData?: OverViewTable[];
}

const ApprovedOverviewTable: React.FC<ApprovedOverviewProps> = ({
  tableData,
}) => {
  const [table,setTable] = useState<OverViewTable[]>([]);
  const [loading,setLoading] = useState<boolean>(false);
  const columns = [
    { title: "Time Period", key: "period", align: "left" as const },
    {
      title: "Time logged",
      key: "loggedTime",
      align: 'left' as const
    },
    { title: "Time Approved", key: "approvedTime", align: "left" as const },
    {
      title: "Actions",
      key: "action",
      align: "left" as const,
      width: 100
    },
  ];

  const data = table.map(element => ({
    period: <span className={styles.dataCell}>{element.dateRange}</span> ,
    loggedTime: <span className={styles.dataCell}>{element.loggedHours?element.loggedHours:"--"} hr</span>,
    approvedTime: <span className={styles.dataCell}>{element.approvedHours?element.approvedHours:"--"} hr</span>,
    action: <span className={`${styles.dataCell} ${styles.actionDataCell}`}>Details</span>
  }))

  useEffect(()=>{
    fetchPastDueWeeks(setTable,setLoading);
  },[])

  return (
    <div className={styles.approvedOverviewTableWrapper}>
      <CustomTable columns={columns} data={data} />
    </div>
  );
};

export default ApprovedOverviewTable;
