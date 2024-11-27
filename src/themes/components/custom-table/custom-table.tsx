import React, { forwardRef, ReactNode } from "react";
import styles from "./custom-table.module.scss";

interface Column {
  title: ReactNode;
  key: string;
}

interface RowData {
  [key: string]: string | number | boolean | ReactNode | undefined; // Use React.ReactNode to allow JSX
  flag?: "important" | "disabled" | "rowOfTotal"; // Restrict the flag to specific values
}

interface CustomTableProps {
  columns: Column[];
  data: RowData[];
}

const CustomTable = forwardRef<HTMLDivElement, CustomTableProps>(
  ({ columns, data }, ref) => {
    // Calculate width dynamically based on the number of columns
    const columnWidth = `${100 / columns.length}%`;

    return (
      <div ref={ref} className={styles.tableContainer}>
        {/* Header */}
        <div className={styles.tableHeader}>
          {columns.map((column) => (
            <div
              key={column.key}
              className={styles.headerCell}
              style={{ width: columnWidth }}
            >
              {column.title}
            </div>
          ))}
        </div>

        {/* Data Rows */}
        <div className={styles.tableBody}>
          {data.map((row, index) => {
            const isImportant = row.flag === "important";
            const rowOfTotal = row.flag === "rowOfTotal";

            return (
              <div
                key={index}
                className={`${styles.dataRow} ${
                  isImportant ? styles.importantRow : ""
                } ${rowOfTotal ? styles.rowOfTotal : ""}`}
              >
                {columns.map((column) => (
                  <div
                    key={column.key}
                    className={styles.dataCell}
                    style={{ width: columnWidth }}
                  >
                    {row[column.key]} {/* Render content, including JSX */}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default CustomTable;
