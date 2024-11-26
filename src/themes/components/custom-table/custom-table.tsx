"use client";
import React, { forwardRef } from "react";
import { Table, TableProps } from "antd";
import styles from "./custom-table.module.scss";

interface CustomTableProps<T> extends TableProps<T> {
  data: T[];
  columns: TableProps<T>["columns"];
}

// Forward the ref properly
const CustomTable = forwardRef<HTMLDivElement, CustomTableProps<any>>(
  ({ data, columns, ...props }, ref) => {
    return (
      <div ref={ref} className={styles.tableContainer}>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          {...props}
          rowKey={(record: any) => record.key || `${Math.random()}`}
          className={styles.customTable}
        />
      </div>
    );
  }
);

export default CustomTable;
