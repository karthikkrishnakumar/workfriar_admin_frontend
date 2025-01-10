import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Table as AntTable, Skeleton } from "antd";
import styles from "./table.module.scss";
import SkeletonLoader from "../skeleton-loader/skeleton-loader";

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
  skeletonRows = 5,
}) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const formattedColumns = columns.map((column) => ({
    ...column,
    className: `${styles.column} ${column.className || ""}`.trim(),
    render: loading
      ? () => (
          <Skeleton
            key={`skeleton-${column.key}`}
            paragraph={false}
            title={{ width: "100%" }}
            active
          />
        )
      : column.render,
  }));

  const skeletonData = useMemo(() => {
    if (!loading) return undefined;

    return Array(skeletonRows)
      .fill(null)
      .map((_, index) => ({
        key: `skeleton-${index}`,
        ...Object.fromEntries(
          columns.map((col) => [col.dataIndex || col.key, null])
        ),
      }));
  }, [loading, columns, skeletonRows]);

  const safeRowKey = useCallback(
    (record: any) => {
      if (loading) return record.key;
      if (typeof rowKey === "function") {
        try {
          return rowKey(record);
        } catch {
          return record.key || `fallback-${Math.random()}`;
        }
      }
      if (typeof rowKey === "string") {
        return record[rowKey]?.toString() || `fallback-${Math.random()}`;
      }
      return record.key || `fallback-${Math.random()}`;
    },
    [loading, rowKey]
  );

  if (!hydrated) {
    return (
      <div className={`${styles.tableWrapper} ${className || ""}`.trim()}>
        <SkeletonLoader
          count={1}
          avatar={false}
          title={true}
          paragraph={{ rows: 20 }}
          active={true}
          className={styles.skeletonContainer}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.tableWrapper} ${className || ""}`.trim()}>
      <AntTable
        columns={formattedColumns}
        dataSource={loading ? skeletonData : dataSource}
        loading={false}
        pagination={false}
        className={`${styles.table} ${loading ? styles.skeletonMode : ""}`}
        scroll={{
          x: "max-content",
          y: maxHeight,
        }}
        rowKey={safeRowKey}
      />
    </div>
  );
};


export default Table;
