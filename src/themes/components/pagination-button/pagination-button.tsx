import React from "react";
import { Pagination } from "antd"; // Assuming Ant Design's Pagination is being used
import styles from "./pagination-button.module.scss"; // Importing the SCSS styles
import SkeletonLoader from "../skeleton-loader/skeleton-loader";

interface PaginationComponentProps {
  total: number;
  pageSize: number;
  current: number;
  onChange: (page: number) => void;
  showSizeChanger?: boolean;
  className?: string;
  loading?: boolean;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  total,
  pageSize,
  current,
  onChange,
  showSizeChanger = false,
  className,
  loading = true,
}) => {
  // Calculate the total number of pages
  const totalPages = Math.ceil(total / pageSize);
  // Hide the pagination if there are no items
  if (total === 0) {
    return null;
  }
  return (
    <div className={styles.paginationDiv}>
       {loading ? ( // Display spinner if loading
        <div className={styles.spinner}>
          <SkeletonLoader count={1} button/>
        </div>
      ) : (
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
          disabled={loading} // Disable pagination when loading
        />
      )}
    </div>
  );
};

export default PaginationComponent;
