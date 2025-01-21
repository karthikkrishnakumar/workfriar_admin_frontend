"use client";
import React, { useState } from "react";
import styles from "./add-holiday-modal.module.scss";
import FormField from "@/themes/components/reusable-fields/reusable-fields";
import { Form } from "antd";
import ButtonComponent from "@/themes/components/button/button";
import UseHolidayServices from "../../services/holidays-services";

const AddHolidayModal = () => {
  const [holidayName, setHolidayName] = useState("");
  const [holidayStartDate, setHolidayStartDate] = useState<Date | null>(null);
  const [holidayEndDate, setHolidayEndDate] = useState<Date | null>(null);
  const [holidayType, setHolidayType] = useState("");
  const [location, setLocation] = useState<string[]>();

  const holidayTypeOptions = [
    {
      label: "Nationol Holiday", value:"Nationol Holiday"
    },
    {
      label: "Public Holiday", value:"Public Holiday"
    },
    {
      label: "Restricted Holiday", value:"Restricted Holiday"
    },
    {
      label: "Office Shutdown", value:"Office Shutdown"
    }
  ]


  const locations = [
    {
      label: "India",
      value: "India",
    },
    {
      label: "Dubai",
      value: "Dubai",
    }
  ];


  const handleOnClick = async() =>{
    try{
      const response = await UseHolidayServices().addHolidays(holidayName,holidayType,holidayStartDate!,holidayEndDate!,location!);
      console.log(response);
    }catch(error){
      console.error(error);
    }
  }



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
              onChange={setHolidayName}
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
              label="Holiday Start Date"
              name=""
              required
              onChange={(date) => setHolidayStartDate(date)}
              value={holidayStartDate}
            />
          </div>
          <div className={styles.formGroup}>
            <FormField
              type="datepicker"
              label="Holiday End Date"
              name=""
              required
              onChange={(date) => setHolidayEndDate(date)}
              value={holidayEndDate}
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
        <ButtonComponent label="Save" theme="black" onClick={handleOnClick}/>
        <ButtonComponent label="Cancel" theme="white" />
      </div>
    </Form>
  );
};

export default AddHolidayModal;
