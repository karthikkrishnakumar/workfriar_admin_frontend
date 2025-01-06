import React from "react";
import EmployeeCard from "./employee-card/employee-card";
import styles from "./employee-list.module.scss";
import { useRouter } from "next/navigation";
import { TeamMember } from "@/interfaces/approval-center/approval-center";


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
            name={employee.full_name}
            avatar={employee.profile_pic}
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
