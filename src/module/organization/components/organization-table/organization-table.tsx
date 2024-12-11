    // organization-table.tsx

    import React, { useState, useEffect } from "react";
    import CustomTable, {RowData} from "@/themes/components/custom-table/custom-table"; // Adjust the path based on your project structure
    import { fetchEmployeeData } from "../../services/organization-services/organization-services"; // Import the service function
    import styles from "./organization-table.module.scss"; // Optional: Add styling
    import CustomAvatar from "@/themes/components/avatar/avatar"; // Avatar component import
    import { Dropdown } from "antd";
    import { MoreOutlined } from "@ant-design/icons";

    interface OrganizationTableProps {
    activeTab: string;
    }

    const OrganizationTable: React.FC<OrganizationTableProps> = ({ activeTab }) => {
    const [filteredEmployees, setFilteredEmployees] = useState<RowData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const menuItems = [
        { key: "Details", label: "Details" },
        { key: "Edit", label: "Edit" },
        { key: "Update-role-permissions", label: "Update Role Permissions" },
        { key: "Delete", label: "Delete" },
    ];

    // Function to map employee data to RowData format for compatibility with the table
    const mapEmployeeData = (employees: any[]): RowData[] => {
        return employees.map((employee) => ({
        name: (
            <div className={styles.nameCell}>
            <CustomAvatar name={employee.name} size={50} />
            {/* Custom avatar added */}
            <span className={styles.employeeName}>{employee.name}</span>
            {/* Employee name */}
            </div>
        ),
        email: employee.email,
        department: employee.department,
        role: employee.role,
        reportingManager: employee.reportingManager,
        status: employee.status,
        action: (
            <Dropdown
            menu={{
                items: menuItems,
                onClick: (e) => handleMenuClick(e, employee),
            }}
            trigger={["click"]}
            >
            <span className={styles.deleteButton}>
                <MoreOutlined className={styles.threeDotButton} />
            </span>
            </Dropdown>
        ),
        }));
    };

    const handleMenuClick = (e: { key: string }, record: any) => {
        if (e.key === "Details") {
        console.log("Details clicked for:", record);
       } 
        else if (e.key === "edit") {
        console.log("Edit clicked for:", record);
        }
    };

    // Fetch employee data based on the selected tab
    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try {
            const employees = await fetchEmployeeData(activeTab); // Fetch data using the service
            setFilteredEmployees(mapEmployeeData(employees)); // Map the data to RowData format
        } catch (err) {
            setError("Failed to load employee data");
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [activeTab]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Define column headers for the table
    const columns = [
        { title: "Name", key: "name", align: "left" as const ,width:240},
        { title: "Email", key: "email", align: "left" as const ,width:220},
        { title: "Department", key: "department", align: "left" as const },
        { title: "Role", key: "role", align: "left" as const },
        { title: "Reporting Manager",key: "reportingManager",align: "left" as const,},
        { title: "Status", key: "status", align: "left" as const },
        { title: "", key: "action", align: "left" as const, width: 40 },
    ];

    return (
        <div className={styles.organizationTableWrapper}>
        <CustomTable columns={columns} data={filteredEmployees} />
        </div>
    );
    };

    export default OrganizationTable;
