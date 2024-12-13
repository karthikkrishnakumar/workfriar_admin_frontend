import React from "react";
import { Pagination } from "antd"; // Assuming Ant Design's Pagination is being used
import styles from "./pagination-button.module.scss"; // Importing the SCSS styles

interface PaginationComponentProps {
  total: number;
  pageSize: number;
  current: number;
  onChange: (page: number) => void;
  showSizeChanger?: boolean;
  className?:string;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  total,
  pageSize,
  current,
  onChange,
  showSizeChanger = false,
  className
}) => {
  return (
    <div className={styles.paginationDiv}>
      <Pagination
        className={`${styles.pagination} ${className}`}
        total={total}
        pageSize={pageSize}
        current={current}
        onChange={onChange}
        showSizeChanger={showSizeChanger}
        style={{ textAlign: "right", marginTop: "20px" }} // Align bottom-right
      />
    </div>
  );
};

export default PaginationComponent;
