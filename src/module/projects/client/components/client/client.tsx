"use client";
import React, { useEffect, useState } from "react";
import {message } from "antd";
import styles from "./client.module.scss";
import AddClientModal from "../add-client-modal/add-client-modal";
import useClientService, { ClientData } from "../../services/client-service";
import CustomTable, {
  Column,
  RowData,
} from "@/themes/components/custom-table/custom-table";
import Icons from "@/themes/images/icons/icons";
import StatusDropdown from "@/themes/components/status-dropdown-menu/status-dropdown-menu";

const Client: React.FC = () => {
  const { addClient, changeStatus, fetchClientDetails } = useClientService();
  const [filteredClients, setFilteredClients] = useState<
  RowData[]
>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clientData, setClientData] = useState<ClientData[]>([]);

  // useEffect hook to fetch client data based on the ID when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await fetchClientDetails(); // Make sure you pass the ID
        setClientData(result.data);
        setFilteredClients(mapClientData(result.data));
      } catch (error) {
        message.error("Failed to fetch client details.");
      }
    };

    fetchDetails();
  }, []);

  /**
   * Handles the form submission from the AddClientModal
   * @param {Record<string, any>} values - The values for the new client
   */
  const handleAddClientSubmit = async (values: Record<string, any>) => {
    try {
      const response = await addClient(values);
      console.log(response);
    } catch (err) {
      console.log("Failed.");
    }
    setIsAddModalOpen(false); // Close modal after submission
  };

  /**
   * Changes the client status
   * @param {string} key - The key of the client to update
   * @param {string} newStatus - The new status to set
   */
  const handleStatusChange = async (
    key: string,
    newStatus: ClientData["status"]
  ) => {
    setClientData((prevData) =>
      prevData.map((item) =>
        item._id === key ? { ...item, status: newStatus } : item
      )
    );
    try {
      const response = await changeStatus(key);
      console.log(response);
    } catch (err) {
      console.log("Failed.");
    }
  };

  const columns: Column[] = [
    { title: "Client", key: "client_name", align: "left",width:300 },
    { title: "Location", key: "location", align: "left" },
    {
      title: "Billing currency",
      key: "billing_currency",
      align: "left",
    },
    { title: "Client manager", key: "client_manager", align: "left",width:300 },
    { title: "Status", key: "status", align: "left" },
  ];

  // Function to map client data to RowData format for compatibility with the table
  const mapClientData = (clients: ClientData[]): RowData[] => {

    const handleStatusClick = (
      e: { key: string },
      client: ClientData
    ) => {
      handleStatusChange(client._id, e.key as ClientData["status"]);
    };
    return clients.map((client) => ({
      _id: client._id,
      client_name: (
        <span className={styles.client}>{client.client_name}</span>
      ),
      location: (
        <span className={styles.client}>{client.location}</span>
      ),
      billing_currency: (
        <span className={styles.client}>{client.billing_currency}</span>
      ),
      client_manager: (
        <span className={styles.client}>{client.client_manager}</span>
      ),
      status: (
        <StatusDropdown
          status={client.status}
          menuItems={[
            { label: "Not started", key: "Not started" },
            { label: "In progress", key: "In progress" },
            { label: "On hold", key: "On hold" },
            { label: "Cancelled", key: "Cancelled" },
            { label: "Completed", key: "Completed" },
          ]}
          onMenuClick={(e: any) => handleStatusClick(e, client)}
          arrowIcon={Icons.arrowDownFilledGold}
          className={styles.status}
        />
      ),
    }));
  };
  
  return (
    <div className={styles.tableWrapper}>
      <CustomTable
        columns={columns}
        data={filteredClients}
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
