import React from "react";
import { Table as AntTable, Skeleton } from "antd";
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
  rowKey?: string | ((record: any) => string);
  skeletonRows?: number;
}

const Table: React.FC<TableProps> = ({
  columns,
  dataSource,
  loading = false,
  className,
  maxHeight = 450,
  rowKey,
  skeletonRows = 5
}) => {
  // Format columns with className and handle loading state
  const formattedColumns = columns.map((column) => ({
    ...column,
    className: `${styles.column} ${column.className || ""}`.trim(),
    // Override the render function when loading
    render: loading 
      ? () => (
          <Skeleton 
            key={`skeleton-${column.key}`}
            paragraph={false}
            title={{ width: '100%' }}
            active
          />
        )
      : column.render
  }));

  // Create skeleton data for loading state
  const skeletonData = React.useMemo(() => {
    if (!loading) return undefined;

    return Array(skeletonRows).fill(null).map((_, index) => ({
      key: `skeleton-${index}`, // Ensure skeleton rows have a unique key
      ...Object.fromEntries(
        columns.map(col => [col.dataIndex || col.key, null])
      )
    }));
  }, [loading, columns, skeletonRows]);

  // Create a safe rowKey function that handles both real and skeleton data
  const safeRowKey = React.useCallback((record: any) => {
    if (loading) {
      return record.key; // Use the skeleton key we created above
    }
    
    if (typeof rowKey === 'function') {
      try {
        return rowKey(record);
      } catch {
        return record.key || `fallback-${Math.random()}`; // Fallback if rowKey function fails
      }
    }
    
    if (typeof rowKey === 'string') {
      return record[rowKey]?.toString() || `fallback-${Math.random()}`;
    }

    return record.key || `fallback-${Math.random()}`;
  }, [loading, rowKey]);

  return (
    <div className={`${styles.tableWrapper} ${className || ""}`.trim()}>
      <AntTable
        columns={formattedColumns}
        dataSource={loading ? skeletonData : dataSource}
        loading={false} // Disable default loading since we're using custom skeletons
        pagination={false}
        className={styles.table}
        scroll={{ 
          x: "max-content", 
          y: maxHeight  
        }}
        rowKey={safeRowKey}
      />
    </div>
  );
};

export default Table;