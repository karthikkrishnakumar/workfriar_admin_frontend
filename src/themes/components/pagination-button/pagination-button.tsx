import React from "react";
import { Pagination } from "antd"; // Assuming Ant Design's Pagination is being used
import styles from "./pagination-button.module.scss"; // Importing the SCSS styles

interface PaginationComponentProps {
  total: number;
  pageSize: number;
  current: number;
  onChange: (page: number) => void;
  showSizeChanger?: boolean;
  className?: string;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  total,
  pageSize,
  current,
  onChange,
  showSizeChanger = false,
  className,
}) => {
  // Calculate the total number of pages
  const totalPages = Math.ceil(total / pageSize);

  // Hide the pagination if there are no items
  if (total === 0) {
    return null;
  }

  console.log(pageSize,current,total)

  return (
    <div className={styles.paginationDiv}>
      <Pagination
        className={`${styles.pagination} ${className}`}
        total={total}
        pageSize={pageSize}
        current={current}
        onChange={onChange}
        showSizeChanger={showSizeChanger}
        itemRender={(page, type, originalElement) => {
          if (type === "page") {
            // Ensure page block updates dynamically
            const isWithinRange =
              page >= Math.max(current - 1, 1) &&
              page <= Math.min(current + 1, totalPages);

            return isWithinRange ? originalElement : null;
          }
          return originalElement;
        }}
        style={{ textAlign: "right", marginTop: "20px" }} // Align bottom-right
      />
    </div>
  );
};

export default PaginationComponent;
