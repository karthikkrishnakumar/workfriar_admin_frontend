"use client";
import React, { useEffect, useState } from "react";
import { Tooltip, Dropdown, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation"; // For navigation
import { fetchProjectStatusReport } from "../../services/project-status-report/project-status-report";
import CustomTable from "@/themes/components/custom-table/custom-table";
import styles from "./project-status-report.module.scss";
import CustomAvatar from "@/themes/components/avatar/avatar";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";

const ProjectStatusReport: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize router


  const columns = [
    { title: "Project", key: "project", align: "left" as const, width: 220 },
    { title: "Project Lead", key: "projectLead", align: "left" as const },
    {
      title: "Actual Start & End Date",
      key: "date",
      align: "left" as const,
      width: 220,
    },
    {
      title: "Reporting Period",
      key: "reportingPeriod",
      align: "left" as const,
    },
    { title: "Progress", key: "progress", align: "left" as const, width: 100 },
    { title: "Comments", key: "comments", align: "left" as const },
    { title: "", key: "action", align: "left" as const, width: 50 },
  ];

  const menuItems = [
    { key: "Details", label: "Details" },
    { key: "Edit", label: "Edit" },
  ];

  const handleMenuClick = (e: { key: string }, record: any) => {
    if (e.key === "Details") {
      // Navigate to the ProjectDetails page with the selected project's ID
      router.push(`/project-status-report/report-details/${record.id}`);
    } else if (e.key === "edit") {
      console.log("Edit clicked for:", record);
    }
  };

  const handleRowClick = (record: any) => {
    // Navigate to the ProjectDetails page when the row or project cell is clicked
    router.push(`/project-status-report/report-details/${record.id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchProjectStatusReport();
        const formattedData = result.projects.map((item: any) => ({
          id: item._id, // Include the project ID
          project: (
            <div
              className={styles.projectCell}
              onClick={() => handleRowClick(item)} // Make the project cell clickable
              role="button"
              tabIndex={0}
            >
              <CustomAvatar name={item.project_name} size={50} />
              <div className={styles.projectName}>{item.project_name}</div>
            </div>
          ),
          projectLead: (
            <div
              className={styles.projectLeadCell}
              onClick={() => handleRowClick(item)} // Make the project cell clickable
              role="button"
              tabIndex={0}
            >
              <div className={styles.name}>{item.project_lead}</div>
            </div>
          ),
          date: (
            <div
              className={styles.dateCell}
              onClick={() => handleRowClick(item)} // Make the project cell clickable
              role="button"
              tabIndex={0}
            >
              <div>
                {item.actual_start_date} - {item.actual_end_date}
              </div>
            </div>
          ),
          reportingPeriod: (
            <div
              className={styles.reportingCell}
              onClick={() => handleRowClick(item)} // Make the project cell clickable
              role="button"
              tabIndex={0}
            >
              <div>{item.reporting_period}</div>
            </div>
          ),
          progress: (
            <div
              className={styles.progressCell}
              onClick={() => handleRowClick(item)} // Make the project cell clickable
              role="button"
              tabIndex={0}
            >
              <div>{item.progress}%</div>
            </div>
          ),
          comments: (
            <div
              className={styles.commentsCell}
              onClick={() => handleRowClick(item)} // Make the project cell clickable
              role="button"
              tabIndex={0}
            >
              <Tooltip title={item.comments}>
                <span>{item.comments.slice(0, 20)}...</span>
              </Tooltip>
            </div>
          ),
          action: (
            <Dropdown
              menu={{
                items: menuItems,
                onClick: (e) => handleMenuClick(e, item),
              }}
              trigger={["click"]}
            >
              <span
                className={styles.deleteButton}
                role="button"
                tabIndex={0}
                style={{ cursor: "pointer" }}
              >
                <MoreOutlined className={styles.threeDotButton} />
              </span>
            </Dropdown>
          ),
        }));
        setData(formattedData);
      } catch (error) {
        message.error("Failed to fetch project status report.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.projectStatusReport}>
      {loading ? (
        <>
          <SkeletonLoader
            count={1}
            paragraph={{ rows: 2 }}
            className={styles.customSkeleton}
            classNameItem={styles.customSkeletonItem}
          />
          <SkeletonLoader
            count={1}
            paragraph={{ rows: 15 }}
            className={styles.customSkeleton}
            classNameItem={styles.customSkeletonItem}
          />
        </>
      ) : (
        <div className={styles.tableWrapper}>
          <CustomTable columns={columns} data={data} />
        </div>
      )}
    </div>
  );
};

export default ProjectStatusReport;
