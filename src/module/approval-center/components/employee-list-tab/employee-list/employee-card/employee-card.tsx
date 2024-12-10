import React from "react";
import styles from "./employee-card.module.scss";
import CustomAvatar from "@/themes/components/avatar/avatar";
import ButtonComponent from "@/themes/components/button/button";

interface EmployeeCardProps {
  name: string;
  avatar?: string;
  onClickFunction?: () => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  name,
  avatar,
  onClickFunction,
}) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.nameSection}>
        <CustomAvatar name={name} src={avatar} />
        <h2>{name}</h2>
      </div>

      <ButtonComponent
        theme="filter"
        label="Review Timsheet"
        className={styles.goldenButton}
        onClick={onClickFunction}
      />
    </div>
  );
};

export default EmployeeCard;
