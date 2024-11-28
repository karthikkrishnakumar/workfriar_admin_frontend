import React from "react";
import styles from "./add-holiday-modal.module.scss";
import ModalComponent from "@/themes/components/modal/modal";
import ModalSelectContent from "../modal-input-content/modal-input-content";

const AddHolidayModal = () => {
  const inputField = {
    label: "Holiday Name",
    value: "",
  };

  const selectFields = [
    {
      label: "Holiday Type",
      value: undefined,
      options: [
        { label: "Public", value: "public" },
        { label: "National", value: "national" },
      ],
    },
    {
      label: "Shutdown Period",
      value: undefined,
      options: [
        { label: "Short", value: "short" },
        { label: "Long", value: "long" },
      ],
    },
    {
      label: "Location",
      value: undefined,
      options: [
        { label: "Location A", value: "locationA" },
        { label: "Location B", value: "locationB" },
      ],
    },
  ];

  return (
    <div className={styles.AddHolidayModal}>
      <ModalComponent
        isVisible={true}
        title={"Add Holiday"}
        content={
          <ModalSelectContent
            inputField={inputField}
            selectFields={selectFields}
          />
        }
        primaryButtonLabel={"Cancel"}
        secondaryButtonLabel={"Save"}
        theme="normal"
      />
    </div>
  );
};

export default AddHolidayModal;
