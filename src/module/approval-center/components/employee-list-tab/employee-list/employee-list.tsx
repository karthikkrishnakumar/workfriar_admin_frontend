import React from "react";
import EmployeeCard from "./employee-card/employee-card";
import styles from "./employee-list.module.scss";
import { useRouter } from "next/navigation";
import { TeamMember } from "@/interfaces/approval-center/approval-center";
import { Empty } from "antd";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";

interface EmployeeListProps {
  employeeList: TeamMember[];
  loading: boolean;
}

const EmployeeList: React.FC<EmployeeListProps> = ({
  employeeList,
  loading,
}) => {
  const router = useRouter();

  const handleRouting = (id: string) => {
    router.push(`/time-sheet/review-timesheet/${id}`);
  };

  return (
    <>
      {loading ? (
        <SkeletonLoader
          paragraph={{ rows: 15 }}
          classNameItem={styles.customSkeleton}
        />
      ) : (
        <div className={styles.employeeListWrapper}>
          {employeeList?.length === 0 ? (
            <Empty className={styles.emptyWrapper} />
          ) : (
            employeeList.map((employee) => (
              <EmployeeCard
                key={employee.id} // Add a key for list rendering
                name={employee.full_name}
                avatar={employee.profile_pic}
                onClickFunction={() => handleRouting(employee.id)}
              />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default EmployeeList;
