import { TeamMember } from "@/module/approval-center/services/all-time-sheet-services";
import React from "react";
import EmployeeCard from "./employee-card/employee-card";
import styles from "./employee-list.module.scss";
import { useRouter } from "next/navigation";


interface EmployeeListProps {
  employeeList: TeamMember[];
}
const EmployeeList: React.FC<EmployeeListProps> = ({ employeeList }) => {
  const router = useRouter();
  const handleRouting = (id: string) => {
    router.push(`/time-sheet/review-timesheet/${id}`);
  };
  return (
    <div className={styles.employeeListWrapper}>
      {employeeList.map((employee) => {
        return (
          <EmployeeCard
            name={employee.name}
            avatar={employee.avatar}
            onClickFunction={() => {
              handleRouting(employee.id);
            }}
          />
        );
      })}
    </div>
  );
};

export default EmployeeList;
