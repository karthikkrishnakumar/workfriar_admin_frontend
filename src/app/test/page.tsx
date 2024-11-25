import React from "react";
import TabComponent from "@/themes/components/tabs/tabs";
import TableWrapper from "@/themes/components/custom-table-wrapper/custom-table-wrapper";

export default function Page() {
  const tabs = [
    { key: "1", label: "All timesheets", content: <div>Tab 1 content</div> },
    { key: "2", label: "Past due", content: <div>Tab 2 content</div> },
    { key: "3", label: "Rejected timesheet", content: <div>Tab 3 content</div> },
  ];

  const columns = [
    { title: "Task", dataIndex: "task", key: "task" },
    { title: "Task Details", dataIndex: "taskDetails", key: "taskDetails" },
    { title: "Mon", dataIndex: "mon", key: "mon" },
    { title: "Tue", dataIndex: "tue", key: "tue" },
    { title: "Total", dataIndex: "total", key: "total" },
    { title: "", dataIndex: "action", key: "action" },
  ];

  const data = [
    {
      key: "1",
      task: "+ Add Task",
      taskDetails: "Add task description",
      mon: "00:00",
      tue: "00:00",
      total: "00:00",
      action: "something"
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <TabComponent headings={tabs} />
      <TableWrapper data={data} columns={columns} />
    </div>
  );
}
