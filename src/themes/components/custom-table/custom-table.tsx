"use client";
import React, { forwardRef, ReactNode, CSSProperties } from "react";
import styles from "./custom-table.module.scss";

interface Column {
  title: ReactNode;
  key: string;
  width?: string | number; // Optional width for specific column
  align?: "left" | "center" | "right"; // Optional alignment
}

interface RowData {
  [key: string]: string | number | boolean | ReactNode | undefined;
  flag?: "important" | "disabled" | "rowOfTotal";
}

interface CustomTableProps {
  columns: Column[];
  data: RowData[];
  className?: string;
}

const CustomTable = forwardRef<HTMLDivElement, CustomTableProps>(
  ({ columns, data, className }, ref) => {
    // Prepare column styles
    const getColumnStyle = (column: Column): CSSProperties => {
      const style: CSSProperties = {};

      // Handle width if specified
      if (column.width) {
        style.width =
          typeof column.width === "number" ? `${column.width}px` : column.width;
        style.flexShrink = 0; // Prevent shrinking for fixed-width columns
      } else {
        style.flex = 1; // Distribute remaining space equally
      }

      // Handle text alignment
      style.justifyContent =
        column.align === "left"
          ? "flex-start"
          : column.align === "right"
          ? "flex-end"
          : "center";

      return style;
    };

    return (
      <div ref={ref} className={`${styles.tableContainer} ${className || ""}`}>
        {/* Header */}
        <div className={styles.tableHeader}>
          {columns.map((column) => (
            <div
              key={column.key}
              className={styles.headerCell}
              style={getColumnStyle(column)}
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
            const isFirstRow = index === 0;
            const isLastRow = index === data.length - 1;

            return (
              <div
                key={index}
                className={`${styles.dataRow} 
                  ${isImportant ? styles.importantRow : ""} 
                  ${rowOfTotal ? styles.rowOfTotal : ""} 
                  ${isFirstRow ? styles.firstRow : ""} 
                  ${isLastRow ? styles.lastRow : ""}`}
              >
                {columns.map((column) => (
                  <div
                    key={column.key}
                    className={styles.dataCell}
                    style={getColumnStyle(column)}
                  >
                    {row[column.key]}
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

CustomTable.displayName = "CustomTable";

export default CustomTable;
