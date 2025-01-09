// organization-table.tsx

import React, { useState, useEffect } from "react";
import CustomTable, {
  Column,
  RowData,
} from "@/themes/components/custom-table/custom-table"; // Adjust the path based on your project structure
import UseEmployeeData from "../../services/organization-services/organization-services";
import styles from "./organization-table.module.scss"; // Optional: Add styling
import CustomAvatar from "@/themes/components/avatar/avatar"; // Avatar component import
import { Dropdown, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import { useRouter } from "next/navigation"; // Import Next.js router
import Icons from "@/themes/images/icons/icons";
import StatusDropdown from "@/themes/components/status-dropdown-menu/status-dropdown-menu";
import PaginationComponent from "@/themes/components/pagination-button/pagination-button";
import { useDispatch, useSelector } from "react-redux";
import AddEditEmployeeModal from "../add-edit-employee-modal/add-edit-employee";
import { RootState } from "@/redux/store";
import { closeModal } from "@/redux/slices/modalSlice";

interface OrganizationTableProps {
  activeTab: string;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  reporting_manager: string;
  status: boolean;
  profile_pic_path: string;
}

const OrganizationTable: React.FC<OrganizationTableProps> = ({ activeTab }) => {
  const [filteredEmployees, setFilteredEmployees] = useState<RowData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState<number | null>(0); // Total records for pagination
  const pageSize = 3; // Number of rows per page
  const router = useRouter();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [employeeData, setEmployeeData] = useState<any>(null);

  const { isOpen } = useSelector((state: RootState) => state.modal);

  const handleStatusChange = async (employee: Employee, newStatus: boolean) => {
    try {
      // Update status on the backend
      const response = await UseEmployeeData().updateEmployeeStatus(
        employee.id,
        newStatus
      );

      // Check if the status update was successful
      if (response?.status === true) {
        // Update status in the frontend only if the service returns success
        setFilteredEmployees((prev) =>
          prev.map((emp) =>
            emp.id === employee.id
              ? {
                  ...emp,
                  status: (
                    <StatusDropdown
                      status={newStatus ? "Active" : "Inactive"}
                      menuItems={[
                        { key: "active", label: <span>Active</span> },
                        { key: "inactive", label: <span>Inactive</span> },
                      ]}
                      onMenuClick={(key) =>
                        handleStatusChange(employee, key === "active")
                      }
                      arrowIcon={Icons.arrowDownFilledGold}
                      className={styles.employeeStatus}
                    />
                  ),
                }
              : emp
          )
        );
        message.success(
          `Status updated to ${newStatus ? "Active" : "Inactive"} for ${
            employee.name
          }.`
        );
      } else {
        // Handle unsuccessful response
        console.error(
          "Failed to update status. Backend response was not successful."
        );
        message.error(
          `Failed to update status for ${employee.name}. Please try again.`
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      message.error("An unexpected error occurred. Please try again.");
    }
  };

  const menuItems = [
    { key: "Details", label: "Details" },
    { key: "Edit", label: "Edit" },
  ];

  // Function to map employee data to RowData format for compatibility with the table
  const mapEmployeeData = (employees: Employee[]): RowData[] => {
    return employees.map((employee) => ({
      id: employee.id,
      name: (
        <span className={styles.nameCell}>
          <CustomAvatar
            name={employee.name}
            src={employee.profile_pic_path ?? undefined}
            size={50}
          />
          {/* Custom avatar */}
          <button
            className={styles.employeeName}
            onClick={() => handleRowClick(employee)}
          >
            {employee.name}
          </button>
          {/* Employee name */}
        </span>
      ),
      email: <span className={styles.employeeEmail}>{employee.email}</span>,
      department: (
        <span className={styles.employeeDepartment}>{employee.department}</span>
      ),
      role: <span className={styles.employeeRole}>{employee.role}</span>,
      reportingManager: (
        <span className={styles.employeeManager}>
          {employee.reporting_manager ? employee.reporting_manager : "--"}
        </span>
      ),
      status: (
        <StatusDropdown
          status={employee.status ? "Active" : "Inactive"}
          menuItems={[
            { key: "active", label: <span>Active</span> },
            { key: "inactive", label: <span>Inactive</span> },
          ]}
          onMenuClick={(key) => {
            handleStatusChange(employee, key === "active");
          }}
          arrowIcon={Icons.arrowDownFilledGold}
          className={styles.employeeStatus}
        />
      ),
      action: (
        <span className={styles.actionCell}>
          <Dropdown
            menu={{
              items: menuItems,
              onClick: (e) => handleMenuClick(e, employee),
            }}
            trigger={["click"]}
          >
            <MoreOutlined className={styles.threeDotButton} />
          </Dropdown>
        </span>
      ),
    }));
  };

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await UseEmployeeData().fetchEmployeesData(
        page,
        pageSize,
        activeTab
      ); // Fetch data using the service

      setFilteredEmployees(mapEmployeeData(response.data)); // Map the data to RowData format

      setTotalRecords(response.total);
    } catch (err) {
      setError("Failed to load employee data");
    } finally {
      setLoading(false);
    }
  };
  // Fetch employee data based on the selected tab
  useEffect(() => {
    fetchData(currentPage);
  }, [activeTab, currentPage]);

  if (error) {
    return <div>{error}</div>;
  }

  // Define column headers for the table
  const columns: Column[] = [
    { title: "Employee name", key: "name", align: "left", width: 220 },
    {
      title: "Email address",
      key: "email",
      align: "left",
      width: 240,
    },
    { title: "Department", key: "department", align: "left" },
    { title: "Role", key: "role", align: "left" },
    {
      title: "Reporting Manager",
      key: "reportingManager",
      align: "left",
    },
    { title: "Status", key: "status", align: "left" },
    { title: "", key: "action", align: "left", width: 40 },
  ];

  const handleRowClick = (row: Employee) => {
    if (row.id) {
      const rowId = row.id;
      router.push(`/organization/employee-details/${rowId}`); // Navigate to the ID-based page
    }
  };
  const handleMenuClick = async (e: { key: string }, employee: Employee) => {
    if (e.key === "Details") {
      if (employee.id) {
        const rowId = employee.id;
        router.push(`/organization/employee-details/${rowId}`); // Navigate to the ID-based page
      }
    } else if (e.key === "Edit") {
      setIsModalOpen(true);
      const data = await UseEmployeeData().fetchEmployeeData(employee.id);
      setEmployeeData(data.data);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update the current page
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    setIsModalOpen(false);
    fetchData(currentPage);
  };

  return (
    <>
      <div className={styles.organizationTableWrapper}>
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
              paragraph={{ rows: 4 }}
              classNameItem={styles.customSkeletonItem}
            />
            <SkeletonLoader
              count={3}
              paragraph={{ rows: 5 }}
              classNameItem={styles.customSkeletonItem}
            />
          </>
        ) : (
          <div className={styles.tableWrapper}>
            <CustomTable columns={columns} data={filteredEmployees} />
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
        />
      </div>

      {isOpen && <AddEditEmployeeModal mode="add" onClose={handleCloseModal} />}
      {isModalOpen && (
        <AddEditEmployeeModal
          mode="edit"
          onClose={handleCloseModal}
          employeeData={employeeData}
        />
      )}
    </>
  );
};

export default OrganizationTable;
