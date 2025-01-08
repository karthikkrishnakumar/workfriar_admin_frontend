import React, { useState, ReactNode } from "react";
import { Tooltip } from "antd";
import styles from "./tabbed-filter.module.scss";

interface TabbedComponentProps {
  tabs: { name: string; content: ReactNode, disabled?: boolean, tooltipMessage?: string }[];
  classTabbedComponent?: string;
  disabledTabs?: number[]; // Specify the disabled tabs
}

const TabbedComponent: React.FC<TabbedComponentProps> = ({ tabs, classTabbedComponent, disabledTabs = [] }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    if (!disabledTabs.includes(index)) {
      setActiveTab(index);
    }
  };

  return (
    <div className={`${styles.tabbedComponent} ${classTabbedComponent}`}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => {
          const isDisabled = disabledTabs.includes(index);
          return (
            <Tooltip key={index} title={isDisabled ? tab.tooltipMessage : ""}>
              <button
                className={`${styles.tabButton} ${activeTab === index ? styles.activeTab : ""} ${isDisabled ? styles.disabled : ""}`}
                onClick={() => handleTabClick(index)}
                disabled={isDisabled}
              >
                {tab.name}
              </button>
            </Tooltip>
          );
        })}
      </div>
      <div className={styles.tabContent}>{tabs[activeTab].content}</div>
    </div>
  );
};

export default TabbedComponent;
