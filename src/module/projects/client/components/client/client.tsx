"use client";
import React, { useEffect, useState } from "react";
import { Dropdown, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "./client.module.scss";
import ClientModal from "../add-edit-client-modal/add-edit-client-modal";
import useClientService, { ClientData } from "../../services/client-service";
import CustomTable, {
  Column,
  RowData,
} from "@/themes/components/custom-table/custom-table";
import Icons from "@/themes/images/icons/icons";
import StatusDropdown from "@/themes/components/status-dropdown-menu/status-dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeModal } from "@/redux/slices/modalSlice";

const Client: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((state: RootState) => state.modal);
  const { addClient, editClient, changeStatus, fetchClientDetails } = useClientService();
  const [filteredClients, setFilteredClients] = useState<
  RowData[]
>([]);
const [selectedId, setSelectedId] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [clientData, setClientData] = useState<ClientData| null>(null);

  // useEffect hook to fetch client data based on the ID when the component mounts
  useEffect(() => {


    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const result = await fetchClientDetails(); 
      setFilteredClients(mapClientData(result.data));
    } catch (error) {
      message.error("Failed to fetch client details.");
    }
  };

  /**
   * Handles the form submission from the AddClientModal
   * @param {Record<string, any>} values - The values for the new client
   */
  const handleAddClientSubmit = async (values: Record<string, any>) => {
    try {
      const response = await addClient(values);
      console.log(response);
      fetchDetails();
      if(response.status){
        message.success(response.message)
      }
      else{
        message.error(response.message)
      }
    } catch (err) {
      console.log("Failed.");
    }
    dispatch(closeModal())
  };

  const handleEditClientSubmit = async (values: Record<string, any>) => {
    const payload={
      ...values,
      _id:selectedId
    }
    try {

      const response = await editClient(payload);
      console.log(response);
      if(response.status){
        message.success(response.message)
      }
      else{
        message.error(response.message)
      }
      fetchDetails();
    } catch (err) {
      console.log("Failed.");
    }
    setIsEditModalOpen(false);
  };

  /**
   * Changes the client status
   * @param {string} key - The key of the client to update
   * @param {string} newStatus - The new status to set
   */
  const handleStatusChange = async (
    _id: string,
    status: string,
  ) => {
    try {
      const payload = {_id, status}
      const response = await changeStatus(payload);
      if(response.status){
        message.success(response.message)
      }
      else{
        message.error(response.message)
      }
      fetchDetails();
    } catch (err) {
      console.log("Failed.");
    }
  };

  const handleEditProject = async (client: ClientData) => {
    const filteredClient = {
      ...client,
      location: client.location_id,
      client_manager: client.client_manager_id,
      billing_currency:client.billing_currency_id
    }
    setClientData(filteredClient);
    setSelectedId(client._id);
    setIsEditModalOpen(true);
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
    { title: "", key: "action", align: "left", width: 30 },
  ];

  // Function to map client data to RowData format for compatibility with the table
  const mapClientData = (clients: ClientData[]): RowData[] => {

    const handleMenuClick = (
      e: { key: string },
      client: ClientData
    ) => {
      if (e.key === "Edit") {
        if (client._id) {
          handleEditProject(client);
        }
      } 
    };

    const handleStatusClick = (
      status: string ,
      id: string
    ) => {
      handleStatusChange(id, status);
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
            { label: "Active", key: "Active" },
            { label: "Inactive", key: "Inactive" },
          ]}
          onMenuClick={(e: any) => handleStatusClick(e, client._id)}
          arrowIcon={Icons.arrowDownFilledGold}
          className={styles.status}
        />
      ),
      action: (
        <span className={styles.actionCell}>
          <Dropdown
            menu={{
              items: [
                { key: "Edit", label: "Edit" },
              ],
              onClick: (e) => handleMenuClick(e, client),
            }}
            trigger={["click"]}
          >
            <MoreOutlined className={styles.threeDotButton} />
          </Dropdown>
        </span>
      ),
    }));
  };
  
  return (
    <div className={styles.tableWrapper}>
      <CustomTable
        columns={columns}
        data={filteredClients}
      />
      {isOpen && modalType === "addModal" && (
      <ClientModal
      isModalOpen={true}
      onClose={() => dispatch(closeModal())}
      onSave={handleAddClientSubmit}
    />
      )}
      {isEditModalOpen && (
        <ClientModal
        type="edit"
          isModalOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
          onSave={handleEditClientSubmit}
          initialValues={clientData}
        />
      )}
    </div>
  );
};

export default Client;
