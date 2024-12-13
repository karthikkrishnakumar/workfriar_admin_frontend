"use client";

import React, { forwardRef, ReactNode, CSSProperties } from "react";
import styles from "./multiple-body-table.module.scss";

interface Column {
  /**
   * The title of the column to be displayed in the table header.
   */
  title: ReactNode;
  /**
   * A unique key for the column, used to identify and render the corresponding data in rows.
   */
  key: string;
  /**
   * Optional: The width of the column. Can be a number (in pixels) or a string (e.g., percentage).
   */
  width?: string | number;
  /**
   * Optional: Alignment of the text within the column. Defaults to center if not specified.
   */
  align?: "left" | "center" | "right";
}

export interface BodyData {
  heading: string | ReactNode;
  rows: RowData[];
}

export interface RowData {
  /**
   * A flexible object where keys correspond to column keys, and values are the data for each cell.
   */
  [key: string]: string | number | boolean | ReactNode | undefined;
  /**
   * Optional: A flag to indicate the type of row styling.
   * - `important`: Highlights the row as important.
   * - `disabled`: Can be used to dim or indicate a disabled row.
   * - `rowOfTotal`: Applies a distinct style for total or summary rows.
   */
  flag?: "important" | "disabled" | "rowOfTotal";
}

interface CustomTableProps {
  /**
   * An array of column definitions, specifying the structure and behavior of the table.
   */
  columns: Column[];
  /**
   * An array of row data objects. Each object corresponds to a row in the table.
   */
  data: BodyData[];
  /**
   * Optional: Additional className for custom styling.
   */
  className?: string;
  /**
   * Optional: whether the column should hide
   */
  hideColumn?: boolean;
}

/**
 * CustomTable
 *
 * A highly customizable table component that supports dynamic column widths,
 * text alignment, and row-level styling based on flags.
 *
 * @param {CustomTableProps} props - The properties for the CustomTable component.
 * @returns {JSX.Element} The rendered table component.
 */
const MultipleBodytable = forwardRef<HTMLDivElement, CustomTableProps>(
  ({ columns, data, className, hideColumn = false }, ref) => {
    /**
     * Helper function to generate column-specific styles.
     * @param {Column} column - The column definition.
     * @returns {CSSProperties} The generated inline styles.
     */
    const getColumnStyle = (column: Column): CSSProperties => {
      const style: CSSProperties = {};

      // Handle column width
      if (column.width) {
        style.width =
          typeof column.width === "number" ? `${column.width}px` : column.width;
        style.flexShrink = 0; // Prevent shrinking for fixed-width columns
      } else {
        style.flex = 1; // Allow flexible width distribution
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
        {/* Table Header */}
        {!hideColumn && (
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
        )}

        {/* Table Body */}

        <div className={styles.tableBodyContainer}>
          {data.map((body, bodyIndex) => (
            <div key={bodyIndex} className={styles.tableSection}>
              {/* Heading for each table section */}
              <h2 className={styles.sectionHeading}>{body.heading}</h2>

              <div className={styles.tableBody}>
                {body.rows.map((row, rowIndex) => {
                  // Determine styling flags
                  const isImportant = row.flag === "important";
                  const rowOfTotal = row.flag === "rowOfTotal";
                  const isFirstRow = rowIndex === 0;
                  const isLastRow = rowIndex === body.rows.length - 1;

                  return (
                    <div
                      key={rowIndex}
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
          ))}
        </div>
      </div>
    );
  }
);

// Set a display name for the component for debugging or development tools
MultipleBodytable.displayName = "MultipleBodyTable";

export default MultipleBodytable;
