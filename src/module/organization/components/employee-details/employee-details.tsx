import React, { useEffect, useState } from "react";
import GridContainer from "@/themes/components/grid-container/grid-container";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import styles from "./employee-details.module.scss";
import { useEmployeeData } from "../../services/organization-services/organization-services";

interface EmployeeDetailsProps {
  employeeId: string;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ employeeId }) => {
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchEmployeeData } = useEmployeeData();

  useEffect(() => {
    const getEmployeeData = async () => {
      try {
        const data = await fetchEmployeeData(employeeId);
        console.log(data);
        setEmployeeData(data.data);
      } catch (err: any) {
        setError("Failed to fetch employee details");
      } finally {
        setLoading(false);
      }
    };

    getEmployeeData();
  }, [employeeId]);

  // Fallback demo data
  const demoData = {
    avatar: {
      name: "Guruvayurappan G R",
      profile: "",
      size: 60,
    },
    fields_one: [
      { label: "Employee name", value: "Guruvayurappan G R" },
      { label: "Email address", value: "guru@gmail.com" },
    ],
    fields_two: [
      { label: "Location", value: "India" },
      { label: "Phone number", value: "+91 9876543210" },
      { label: "Employee role", value: "Project Manager" },
      { label: "Department", value: "Management" },
      { label: "Reporting Manager", value: "Madavan Ramakrishnan" },
      { label: "Status", value: "In progress" },
    ],
  };

  // Use fetched data if available, otherwise fallback to demo data
  const displayData = employeeData
    ? {
        avatar: {
          name: employeeData.name,
          profile: employeeData.profile || "",
          size: 100,
        },
        fields_one: [
          { label: "Employee name", value: employeeData.name },
          { label: "Email address", value: employeeData.email },
        ],
        fields_two: [
          { label: "Location", value: employeeData.location },
          { label: "Phone number", value: employeeData.phone },
          { label: "Employee role", value: employeeData.role },
          { label: "Department", value: employeeData.department },
          { label: "Reporting Manager", value: employeeData.reporting_manager },
          { label: "Status", value: employeeData.status?"Active":"In Active" },
        ],
      }
    : demoData;

  if (error) return <div>{error}</div>;

  return (
    <div>
      {loading ? (
        <div>
          <SkeletonLoader profile classNameItem={styles.customSkeleton} />
          <SkeletonLoader
            paragraph={{ rows: 8 }}
            classNameItem={styles.customSkeletonItem}
          />
        </div>
      ) : (
        <>
          <GridContainer
            isGrid={true}
            avatar={displayData.avatar}
            fields={displayData.fields_one}
          />
          <GridContainer isGrid={true} fields={displayData.fields_two} />
        </>
      )}
    </div>
  );
};

export default EmployeeDetails;
