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
  const formattedColumns = columns.map((column) => ({
    ...column,
    className: `${styles.column} ${column.className || ""}`.trim(),
  }));

  // Create skeleton data for loading state
  const skeletonData = React.useMemo(() => {
    if (!loading) return undefined;

    return Array(skeletonRows).fill(null).map((_, index) => ({
      key: `skeleton-${index}`,
      ...Object.fromEntries(
        columns.map(col => [
          col.dataIndex || col.key,
          <Skeleton 
            key={`skeleton-${index}-${col.key}`}
            paragraph={false}
            title={{ width: '100%' }}
            active
          />
        ])
      )
    }));
  }, [loading, columns, skeletonRows]);

  return (
    <div className={`${styles.tableWrapper} ${className || ""}`.trim()}>
      <AntTable
        columns={formattedColumns}
        dataSource={loading ? skeletonData : dataSource}
        loading={false} // We disable default loading since we're handling it ourselves
        pagination={false}
        className={`${styles.table}`}
        scroll={{ 
          x: "max-content", 
          y: maxHeight  
        }}
        rowKey={rowKey}
      />
    </div>
  );
};

export default Table;