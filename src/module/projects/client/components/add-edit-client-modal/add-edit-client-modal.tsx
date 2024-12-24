"use client";
import React, { useEffect, useState } from "react";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import useClientService, { ClientData } from "../../services/client-service";
import { message } from "antd";


interface ModalProps {
  isModalOpen: boolean;
  onClose?: () => void;
  onSave: (values: Record<string, any>) => void;
  initialValues?: ClientData | null;
  type?:string;
}


const ClientModal: React.FC<ModalProps> = ({
  isModalOpen,
  onClose,
  onSave,
  initialValues,
  type
}) => {

  const [currency, setCurrency] = useState([]);
  const [clientManagers, setClientManagers] = useState([]);
  const [countries, setCountries] = useState([]);

  const values = initialValues || {};
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const currency = await useClientService().fetchCurrencies(); 
        setCurrency(currency.data);
        const countries = await useClientService().fetchCountries(); // Make sure you pass the ID
        setCountries(countries.data);
        const clientManagers = await useClientService().fetchClientManagers(); // Make sure you pass the ID
        setClientManagers(clientManagers.data);
      } catch (error) {
        message.error("Failed to fetch details.");
      }
    };

    fetchDetails();
  }, []);

  
  return (
    <>

    <ModalFormComponent
      isVisible={isModalOpen}
      onClose={onClose}
      title={type === "edit" ? "Edit Client" : "Add Client"}
      primaryButtonLabel={"Save"}
      secondaryButtonLabel={"Cancel"}
      onPrimaryClick={onSave}
      initialValues={values}
      formRows={[
        {
          fields: [
            {
              name: "client_name",
              label: "Client",
              type: "text",
              required: true,
              placeholder: "Enter client",
            },
            {
              name: "location",
              label: "Location",
              type: "select",
              options: countries.map((countries:any) => ({
                label: countries.country, 
                value: countries._id,
              })),
              required: true,
              placeholder: "Select location",
            },
          ],
        },
        {
          fields: [
            {
              name: "client_manager",
              label: "Client Manager",
              type: "select",
              options: clientManagers.map((manager:any) => ({
                label: manager.full_name, 
                value: manager._id,
              })),
              required: true,
              placeholder: "Select client manager",
            },
            {
              name: "billing_currency",
              label: "Billing currency",
              type: "select",
              options: currency.map((currency:any) => ({
                label: currency.currency, 
                value: currency._id,
              })),
              required: true,
              placeholder: "Select billing currency",
            },
          ],
        },
        {
          fields: [
            {
              name: "status",
              label: "Status",
              type: "select",
              options: [
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
              ],
              required: true,
              placeholder: "Select status",
            },
          ],
        },
      ]}
    />
    </>
  );
};

export default ClientModal;
