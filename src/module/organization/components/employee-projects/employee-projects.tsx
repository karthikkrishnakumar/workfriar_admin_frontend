"use client";

import React, { useEffect, useState } from "react";
import CustomTable, {
  RowData,
} from "@/themes/components/custom-table/custom-table"; // Import the CustomTable
import UseEmployeeData from "../../services/organization-services/organization-services"; // Import the service function
import styles from "./employee-projects.module.scss"; // Optional: Add styling
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader"; // Loading skeleton
import { MoreOutlined } from "@ant-design/icons";
import CustomAvatar from "@/themes/components/avatar/avatar";
import { Dropdown } from "antd";
import PaginationComponent from "@/themes/components/pagination-button/pagination-button";


interface EmployeeProjectsProps {
  employeeId: string;
}

const EmployeeProjects: React.FC<EmployeeProjectsProps> = ({ employeeId }) => {
  const [projects, setProjects] = useState<RowData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState<number | null>(0); // Total records for pagination
  const pageSize = 5;

  const menuItems = [{ key: "Details", label: "Details" }];

  // Function to map project data to RowData format for compatibility with the table
  const mapProjectData = (projects: any[]): RowData[] => {
    return projects.map((project) => ({
      key: project.project_id,      
      projectName: (
        <span className={styles.projectNameCell}>
          <CustomAvatar name={project.projectname} size={50} />
          <span className={styles.projectNameSpan}>{project.projectname}</span>
        </span>
      ),
      client: (
        <span className={styles.projectClient}>
          {project.clientname ? project.clientname : "--"}
        </span>
      ),
      dateRange: (
        <span className={styles.projectDateRange}>{`${
          project.dates[0].start_date ? project.dates[0].start_date : ""
        } - ${project.dates[0].end_date ? project.dates[0].end_date : ""}`}</span>
      ),
      projectLead: (
        <span className={styles.projectLead}>{project.projectlead}</span>
      ),
      projectStatus: (
        <span className={styles.statusClass}>{project.status}</span>
      ),
      action: (
        <span className={styles.actionCell}>
          <Dropdown
            menu={{
              items: menuItems,
              onClick: (e) => handleMenuClick(e, project),
            }}
            trigger={["click"]}
          >
            <MoreOutlined className={styles.threeDotButton} />
          </Dropdown>
        </span>
      ),
    }));
  };

  const getEmployeeProjects = async (page: number) => {
    setLoading(true);
    try {
      const data = await UseEmployeeData().fetchEmployeeProjectsData(
        page,
        pageSize,
        employeeId
      ); // Service to fetch employee projects
      setProjects(mapProjectData(data.data)); // Map the data to RowData format
      setTotalRecords(data.total);
    } catch (err) {
      setError("Failed to fetch employee projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployeeProjects(currentPage);
  }, [employeeId, currentPage]);

  // Define column headers for the table
  const columns = [
    {
      title: "Project Name",
      key: "projectName",
      align: "left" as const,
      width: 210,
    },
    { title: "Client", key: "client", align: "left" as const, width: 180 },
    {
      title: "Start and End Date",
      key: "dateRange",
      align: "left" as const,
      width: 260,
    },
    { title: "Project Lead", key: "projectLead", align: "left" as const },
    { title: "Status", key: "projectStatus", align: "left" as const },
    { title: "", key: "action", align: "left" as const, width: 50 },
  ];

  if (error) {
    return <div>{error}</div>;
  }

  const handleMenuClick = (e: { key: string }, record: any) => {
    if (e.key === "Details") {
    } else if (e.key === "edit") {
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update the current page
  };

  return (
    <>
      <div className={styles.employeeProjectsWrapper}>
        {loading ? (
          <>
          <SkeletonLoader
            count={1}
            paragraph={{ rows: 3 }}
            className={styles.customSkeleton}
          />
          <SkeletonLoader
            count={3}
            paragraph={{ rows: 4 }}
            className={styles.customSkeleton}
          />
          </>
        ) : (
          <div className={styles.tableWrapper}>
            <CustomTable columns={columns} data={projects} />
          </div>
        )}
      </div>
      <div className={styles.customPaginationDiv}>
        <PaginationComponent
          total={totalRecords!}
          pageSize={pageSize}
          current={currentPage}
          onChange={handlePageChange}
          showSizeChanger={false}
          className={styles.customPagination}
          loading={loading}
        />
      </div>
    </>
  );
};

export default EmployeeProjects;
