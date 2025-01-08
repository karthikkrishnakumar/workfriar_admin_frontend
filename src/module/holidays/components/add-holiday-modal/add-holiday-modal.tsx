"use client";
import React, { useState } from "react";
import styles from "./add-holiday-modal.module.scss";
import FormField from "@/themes/components/reusable-fields/reusable-fields";
import { Form } from "antd";
import ButtonComponent from "@/themes/components/button/button";

const AddHolidayModal = () => {
  const [holidayName, setHolidayName] = useState("");
  const [holidayDate, setHolidayDate] = useState<Date | null>(null);
  const [holidayType, setHolidayType] = useState("");
  const [location, setLocation] = useState("");

  const holidayTypeOptions = [
    {
      label: "Nationol Holiday", value:"nationalHoliday"
    },
    {
      label: "Public Holiday", value:"publicHoliday"
    },
    {
      label: "Restricted Holiday", value:"restrictedHoliday"
    },
    {
      label: "Office Shutdown", value:"officeShutdown"
    }
  ]


  const locations = [
    {
      label: "India",
      value: "india",
    },
    {
      label: "UAE",
      value: "uae",
    }
  ];



  return (
    <Form className={styles.holidayForm} requiredMark={false} layout="vertical">
      <div className={styles.modalWrapper}>
        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <FormField
              type="input"
              label="Holiday Name"
              name=""
              required
              placeholder="Enter holiday name"
            />
          </div>
          <div className={styles.formGroup}>
            <FormField
              type="select"
              label="Holiday type"
              name=""
              required
              placeholder="Select holiday type"
              options={holidayTypeOptions}
              onChange={setHolidayType}
            />
          </div>
          <div className={styles.formGroup}>
            <FormField
              type="datepicker"
              label="Holiday Date"
              name=""
              required
              onChange={(date) => setHolidayDate(date)}
              value={holidayDate}
            />
          </div>
          <div className={styles.formGroup}>
          <FormField
              type="checkboxSelect"
              label="Location"
              name=""
              required
              placeholder="Select location"
              onChange={setLocation}
              options={locations}
            />
          </div>
        </div>
      </div>
      <div className={styles.modalFooter}>
        <ButtonComponent label="Save" theme="black"/>
        <ButtonComponent label="Cancel" theme="white" />
      </div>
    </Form>
  );
};

export default AddHolidayModal;
