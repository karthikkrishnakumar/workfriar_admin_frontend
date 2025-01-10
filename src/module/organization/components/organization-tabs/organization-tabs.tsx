"use client";

import React, { useState } from "react";
import styles from "./organization-tabs.module.scss";
import TabComponent from "@/themes/components/tabs/tabs";
import OrganizationTable from "../organization-table/organization-table";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";

const OrganizationTabs: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  setTimeout(() => {
    setLoading(false);
  }, 200);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const tabs = [
    {
      key: "all",
      label: "All",
      content: (
        <div>
          <OrganizationTable key={activeTab} activeTab={activeTab} />{" "}
        </div>
      ),
    },
    {
      key: "management",
      label: "Management",
      content: (
        <div>
          <OrganizationTable key={activeTab} activeTab={activeTab} />{" "}
        </div>
      ),
    },
    {
      key: "hr",
      label: "HR",
      content: (
        <div>
          <OrganizationTable key={activeTab} activeTab={activeTab} />{" "}
        </div>
      ),
    },
    {
      key: "finanace",
      label: "Finance",
      content: (
        <div>
          <OrganizationTable key={activeTab} activeTab={activeTab} />{" "}
        </div>
      ),
    },
    {
      key: "operations",
      label: "Operations",
      content: (
        <div>
          <OrganizationTable key={activeTab} activeTab={activeTab} />{" "}
        </div>
      ),
    },
    {
      key: "technical",
      label: "Technical",
      content: (
        <div>
          <OrganizationTable key={activeTab} activeTab={activeTab} />{" "}
        </div>
      ),
    },
  ];

  return (
    <div className={styles.organizationTabsWrapper}>
      {loading ? (
        <SkeletonLoader
          paragraph={{ rows: 2 }}
          classNameItem={styles.customSkeletonItem}
        /> // You can add a skeleton loader here as well
      ) : (
        <TabComponent headings={tabs} onChange={handleTabChange} />
      )}
    </div>
  );
};

export default OrganizationTabs;
