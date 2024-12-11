"use client";

import React, { useState } from "react";
import TabComponent from "@/themes/components/tabs/tabs";
import ForecastDetails from "../forecast-details/forecast-details";
import { Button } from "antd";
import styles from "./project-forecast-tabs.module.scss";

/**
 * Interface representing the project tabs structure.
 * @interface ProjectTabsProps
 */
interface ProjectTabsProps {
  id: string;
}

const ProjectForecastTabs = ({ id }: ProjectTabsProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const tabs = [
    {
      key: "1",
      label: "Forecast",
      content: (
        <ForecastDetails
          id={id}
          isModalOpen={isEditModalOpen}
          setModalOpen={setIsEditModalOpen}
        />
      ),
    },
  ];
  const editButton = (
    <Button onClick={() => setIsEditModalOpen(true)} className={styles.button}>
      Edit forecast
    </Button>
  );

  return (
    <div>
      <div>
        <TabComponent headings={tabs} subHeading={editButton} />
      </div>
    </div>
  );
};

export default ProjectForecastTabs;
