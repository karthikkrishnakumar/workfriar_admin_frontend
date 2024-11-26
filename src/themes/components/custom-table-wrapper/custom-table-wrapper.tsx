"use client";

import React from "react";
import CustomTable from "../custom-table/custom-table";

interface TableWrapperProps<T> {
  data: T[];
  columns: any[];
}

const TableWrapper = <T extends object>({ data, columns }: TableWrapperProps<T>) => {
  return <CustomTable data={data} columns={columns} />;
};

export default TableWrapper;
