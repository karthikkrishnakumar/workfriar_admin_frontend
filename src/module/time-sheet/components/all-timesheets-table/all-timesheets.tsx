import React, { useState } from "react";
import TableWrapper from "@/themes/components/custom-table-wrapper/custom-table-wrapper";
import { Input, Select } from "antd";

const { Option } = Select;

const AllTimesheetsTable = () => {
  const [tableData, setTableData] = useState([
    {
      key: "1",
      task: "UI/UX Design",
      taskDetails: "Bug analysis",
      mon: "00:00",
      tue: "00:00",
      wed: "00:00",
      thu: "00:00",
      fri: "00:00",
      sat: "00:00",
      sun: "00:00",
      total: "00:00",
    },
    {
      key: "2",
      task: "+ Add Task",
      taskDetails: "Add task description",
      mon: "00:00",
      tue: "00:00",
      wed: "00:00",
      thu: "00:00",
      fri: "00:00",
      sat: "00:00",
      sun: "00:00",
      total: "00:00",
    },
  ]);

  const handleInputChange = (key: string, field: string, value: string) => {
    const updatedData = tableData.map((row) =>
      row.key === key ? { ...row, [field]: value } : row
    );
    setTableData(updatedData);
  };

  const columns = [
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
      render: (text: string, record: any) => (
        <Select
          defaultValue={text}
          style={{ width: 150 }}
          onChange={(value) => handleInputChange(record.key, "task", value)}
        >
          <Option value="UI/UX Design">UI/UX Design</Option>
          <Option value="Bug Analysis">Bug Analysis</Option>
          <Option value="Project Meeting">Project Meeting</Option>
        </Select>
      ),
    },
    {
      title: "Task Details",
      dataIndex: "taskDetails",
      key: "taskDetails",
      render: (text: string, record: any) => (
        <Input
          value={text}
          onChange={(e) =>
            handleInputChange(record.key, "taskDetails", e.target.value)
          }
        />
      ),
    },
    ...["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => ({
      title: day.toUpperCase(),
      dataIndex: day,
      key: day,
      render: (text: string, record: any) => (
        <Input
          value={text}
          onChange={(e) => handleInputChange(record.key, day, e.target.value)}
        />
      ),
    })),
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  return (
    <div>
      <TableWrapper columns={columns} data={tableData} />
    </div>
  );
};

export default AllTimesheetsTable;
