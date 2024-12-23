import React from "react";
import { Table as AntTable } from "antd";
import type { TableProps as AntTableProps } from "antd";
import styles from "./table.module.scss";

export interface ColumnType {
  title?: string;
  dataIndex?: string;
  key: string;
  width?: number | string;
  render?: (text: string, record: any, index?: number) => React.ReactNode;
  className?: string;
}

interface TableProps {
  columns: ColumnType[];
  dataSource?: any[];
  loading?: boolean;
  className?: string;
  maxHeight?: number;
  rowKey?: string | ((record: any) => string); // Added rowKey prop
}

const Table: React.FC<TableProps> = ({
  columns,
  dataSource,
  loading = false,
  className,
  maxHeight = 450,
  rowKey, // Add rowKey to destructured props
}) => {
  const formattedColumns = columns.map((column) => ({
    ...column,
    className: `${styles.column} ${column.className || ""}`.trim(),
  }));

  return (
    <div className={`${styles.tableWrapper} ${className || ""}`.trim()}>
      <AntTable
        columns={formattedColumns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
        className={`${styles.table}`}
        scroll={{ 
          x: "max-content", 
          y: maxHeight  
        }}
        rowKey={rowKey} // Pass rowKey to AntTable
      />
    </div>
  );
};

export default Table;