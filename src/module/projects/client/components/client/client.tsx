"use client";
import React, { useState } from "react";
import { Table, Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import styles from "./client.module.scss";
import AddClientModal from "../add-client-modal/add-client-modal";

/**
 * Interface representing the client data structure.
 * @interface ClientData
 */
interface ClientData {
  key: string;
  client_name: string;
  location: string;
  client_manager: string;
  billing_currency: string;
  status: "completed" | "in_progress" | "on_hold" | "cancelled" | "not_started";
}

const Client: React.FC = () => {
  const data: ClientData[] = [
    {
      key: "1",
      client_name: "Techfriar Technologies",
      location: "India",
      client_manager: "Aswina Vinod",
      billing_currency: "",
      status: "completed",
    },
    {
      key: "2",
      client_name: "Techfriar Technologies",
      location: "Dubai",
      client_manager: "Aswina Vinod",
      billing_currency: "Dirham",
      status: "completed",
    },
  ];

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clientData, setClientData] = useState<ClientData[]>(data);

  /**
   * Handles the form submission from the AddClientModal
   * @param {Record<string, any>} values - The values for the new client
   */
  const handleAddClientSubmit = (values: Record<string, any>) => {
    console.log("Updated Client Details:", values);
    setIsAddModalOpen(false); // Close modal after submission
  };

  /**
   * Changes the client status
   * @param {string} key - The key of the client to update
   * @param {string} newStatus - The new status to set
   */
  const handleStatusChange = (key: string, newStatus: ClientData["status"]) => {
    setClientData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, status: newStatus } : item
      )
    );
  };

  /**
   * Converts the status value to a readable format
   * @param {string} status - The status value to convert
   * @returns {string} - The formatted status string
   */
  const getStatusText = (status: ClientData["status"]): string => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const columns = [
    {
      title: "Client",
      dataIndex: "client_name",
      key: "client_name",
      width: "25%",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: "20%",
    },
    {
      title: "Billing currency",
      dataIndex: "billing_currency",
      key: "billing_currency",
      width: "20%",
    },
    {
      title: "Client manager",
      dataIndex: "client_manager",
      key: "client_manager",
      width: "20%",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status: ClientData["status"], record: ClientData) => {
        const menuItems: MenuProps["items"] = [
          { key: "completed", label: getStatusText("completed") },
          { key: "in_progress", label: getStatusText("in_progress") },
          { key: "on_hold", label: getStatusText("on_hold") },
          { key: "cancelled", label: getStatusText("cancelled") },
          { key: "not_started", label: getStatusText("not_started") },
        ];

        const handleMenuClick = (e: { key: string }) => {
          handleStatusChange(record.key, e.key as ClientData["status"]);
        };

        return (
          <Dropdown
            menu={{ items: menuItems, onClick: handleMenuClick }}
            trigger={["click"]}
          >
            <Button type="text" className={styles.statusButton}>
              {getStatusText(status)}
              <span style={{ marginLeft: 0, fontSize: "8px" }}>▼</span>
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className={styles.tableWrapper}>
      <Table
        columns={columns}
        dataSource={clientData}
        pagination={false}
        className={styles.table}
      />
      <AddClientModal
        isAddModalOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddClientSubmit}
      />
    </div>
  );
};

export default Client;
